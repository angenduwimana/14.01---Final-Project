const express = require('express');
const router = express.Router();
const db = require('../bin/db');

const PAGE_SIZE = 5;

router.get('/', (req, res) => {
  res.render('index', { title: 'Downtown Donuts' });
});

router.get('/menu', (req, res) => {
  res.render('menu', { title: 'Menu | Downtown Donuts' });
});

router.get('/about', (req, res) => {
  res.render('about', { title: 'About Us | Downtown Donuts' });
});

router.get('/comments', async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const offset = (page - 1) * PAGE_SIZE;

    const [[countRow]] = await db.query('SELECT COUNT(*) AS total FROM comments');
    const totalComments = countRow.total;
    const totalPages = Math.max(Math.ceil(totalComments / PAGE_SIZE), 1);

    const [rows] = await db.query(
      'SELECT id, name, comment, created_at FROM comments ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [PAGE_SIZE, offset]
    );

    res.render('comments', {
      title: 'Customer Comments | Downtown Donuts',
      comments: rows,
      error: null,
      currentPage: page,
      totalPages
    });
  } catch (err) {
    next(err);
  }
});

router.post('/comments', async (req, res, next) => {
  try {
    const name = (req.body.name || '').trim();
    const comment = (req.body.comment || '').trim();

    if (!name || !comment) {
      return res.status(400).redirect('/comments');
    }

    if (name.length > 50 || comment.length > 500) {
      return res.status(400).redirect('/comments');
    }

    await db.query(
      'INSERT INTO comments (name, comment) VALUES (?, ?)',
      [name, comment]
    );

    res.redirect('/comments');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
