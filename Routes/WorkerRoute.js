// routes/workers.js
const express = require('express');
const router = express.Router();
const { Worker } = require('../models');

// ======================== GET ALL WORKERS ========================
router.get('/getall', async (req, res, next) => {
  try {
    const workers = await Worker.findAll();
    res.json({ success: true, data: workers });
  } catch (err) {
    next(err);
  }
});

// ======================== REGISTER WORKER ========================
router.post('/register', async (req, res, next) => {
  try {
    const payload = req.body;
    if (!payload.Fullname || !payload.ContactInformation) {
      return res.status(400).json({ message: 'Fullname and ContactInformation required' });
    }
    const newWorker = await Worker.create(payload);
    res.json({ success: true, data: newWorker, message: 'Worker registered successfully' });
  } catch (err) {
    next(err);
  }
});

// ======================== UPDATE WORKER ========================
router.patch('/updating/:fullname', async (req, res, next) => {
  try {
    const { fullname } = req.params;
    const updated = await Worker.update(req.body, {
      where: { Fullname: fullname }
    });
    res.json({ success: true, message: 'Worker updated' });
  } catch (err) {
    next(err);
  }
});

// ======================== PAY WORKER ========================
router.patch('/pay/:fullname', async (req, res, next) => {
  try {
    const { fullname } = req.params;
    const paymentData = req.body;
    await Worker.update(paymentData, { where: { Fullname: fullname } });
    res.json({ success: true, message: 'Payment updated' });
  } catch (err) {
    next(err);
  }
});

// ======================== DELETE WORKER ========================
router.delete('/eliminate/:fullname', async (req, res, next) => {
  try {
    const { fullname } = req.params;
    await Worker.destroy({ where: { Fullname: fullname } });
    res.json({ success: true, message: 'Worker deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
