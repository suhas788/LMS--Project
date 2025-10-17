const express = require('express');
const router = express.Router();
const { Batch } = require('../models');

router.get('/', async (req, res) => {
  const items = await Batch.findAll();
  res.json(items);
});

router.get('/:id', async (req, res) => {
  const item = await Batch.findByPk(req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json(item);
});

router.post('/', async (req, res) => {
  const created = await Batch.create(req.body);
  res.json(created);
});

router.put('/:id', async (req, res) => {
  const item = await Batch.findByPk(req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  await item.update(req.body);
  res.json(item);
});

module.exports = router;
