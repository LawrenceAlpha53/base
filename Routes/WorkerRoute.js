const express = require('express');
const router = express.Router();
const WorkerController = require('../Controllers/WorkerController');

// ======================== GET ALL WORKERS ========================
router.get('/getall', WorkerController.Allworkers);

// ======================== REGISTER WORKER ========================
router.post('/register', WorkerController.Register);

// ======================== UPDATE WORKER ========================
router.patch('/updating/:Fullname', WorkerController.UpdatingWorker);

// ======================== PAY WORKER ========================
router.patch('/pay/:Fullname', WorkerController.PayingWorker);

// ======================== DELETE WORKER ========================
router.delete('/eliminate/:Fullname', WorkerController.Eliminate);

module.exports = router;
