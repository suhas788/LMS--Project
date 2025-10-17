const express = require('express');
const router = express.Router();
const { Notification } = require('../models');

router.get('/:userId', async (req, res) => {
  const items = await Notification.findAll({ where: { userId: req.params.userId } });
  res.json(items);
});

router.put('/:id/read', async (req, res) => {
  const n = await Notification.findByPk(req.params.id);
  if (!n) return res.status(404).json({ message: 'Not found' });
  n.isRead = true;
  await n.save();
  res.json(n);
});

module.exports = router;
