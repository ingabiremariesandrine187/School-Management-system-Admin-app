const express = require('express');
const dashboardController = require('../controllers/dashboardController');
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.get('/stats', dashboardController.getDashboardStats);

module.exports = router;
