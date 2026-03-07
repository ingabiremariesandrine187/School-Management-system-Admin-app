const express = require('express');
const transactionController = require('../controllers/transactionController');
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

router.use(protect);

router.get('/', authorize('admin'), transactionController.getAllTransactions);
router.get('/student/:studentId', transactionController.getTransactionsByStudent);
router.post('/', transactionController.createTransaction);
router.put('/:id/approve', authorize('admin'), transactionController.approveTransaction);
router.put('/:id/reject', authorize('admin'), transactionController.rejectTransaction);

module.exports = router;
