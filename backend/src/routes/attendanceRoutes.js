const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const auth = require('../middlewares/authMiddleware');

console.log('Loaded attendanceRoutes');

// temporarily for testing only:
router.post('/mark', auth.requireAuth, attendanceController.markAttendance);
module.exports = router;