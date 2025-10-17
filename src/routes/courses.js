const express = require('express');
const router = express.Router();
const { Course } = require('../models');

router.get('/', async (req, res) => {
  const courses = await Course.findAll();
  res.json(courses);
});

router.get('/:id', async (req, res) => {
  const c = await Course.findByPk(req.params.id);
  if (!c) return res.status(404).json({ message: 'Not found' });
  res.json(c);
});

module.exports = router;
