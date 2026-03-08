const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const auth = require('../middlewares/authMiddleware');

// routes
router.get('/by-class/:id', auth.requireAuth, /* auth.requireRole(['admin','teacher']), */ studentController.byClass);
router.get('/', auth.requireAuth, auth.requireRole(['admin','teacher']), studentController.list);
router.get('/:id', auth.requireAuth, auth.requireRole(['admin','teacher']), studentController.get);
router.post('/', auth.requireAuth, auth.requireRole(['admin','teacher']), studentController.create);
router.put('/:id', auth.requireAuth, auth.requireRole(['admin','teacher']), studentController.update);
router.delete('/:id', auth.requireAuth, auth.requireRole(['admin','teacher']), studentController.remove);

module.exports = router;
