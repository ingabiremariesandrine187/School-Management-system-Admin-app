const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { protect, authorize } = require('../middlewares/auth');
const { validate } = require('../middlewares/validator');

const router = express.Router();

router.post('/login', [
  body('email').isEmail(),
  body('password').notEmpty(),
  validate
], authController.login);

router.post('/register', [
  body('name').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('role').isIn(['admin', 'teacher', 'student', 'parent']),
  validate
], authController.register);

router.get('/pending-verifications', protect, authorize('admin'), authController.getPendingVerifications);
router.put('/verify-device/:userId', protect, authorize('admin'), authController.verifyDevice);

module.exports = router;
