const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Downtown Donuts' });
});

router.get('/menu', (req, res) => {
  res.render('menu', { title: 'Menu | Downtown Donuts' });
});

router.get('/about', (req, res) => {
  res.render('about', { title: 'About Us | Downtown Donuts' });
});

router.get('/comments', (req, res) => {
  res.render('comments', {
    title: 'Customer Comments | Downtown Donuts',
    comments: [],
    error: null
  });
});

module.exports = router;

