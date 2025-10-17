const express = require('express');
const router = express.Router();
const { Review } = require('../models');

router.get('/', async (req, res) => {
  const reviews = await Review.findAll();
  res.json(reviews);
});

router.get('/:courseId', async (req, res) => {
  const reviews = await Review.findAll({ where: { courseId: req.params.courseId } });
  res.json(reviews);
});

router.post('/', async (req, res) => {
  const created = await Review.create(req.body);
  res.json(created);
});

module.exports = router;
