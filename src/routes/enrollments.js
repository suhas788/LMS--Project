const express = require('express');
const router = express.Router();
const { Enrollment } = require('../models');

router.post('/', async (req, res) => {
  // body: { courseId, userId, batchId }
  const created = await Enrollment.create(req.body);
  res.json({ success: true, enrollment: created });
});

router.get('/my-courses', async (req, res) => {
  // For simplicity, expect ?userId=
  const userId = req.query.userId;
  if (!userId) return res.json([]);
  const enrollments = await Enrollment.findAll({ where: { userId } });
  res.json(enrollments);
});

module.exports = router;
