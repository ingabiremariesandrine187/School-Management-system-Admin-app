const express = require('express');
const router = express.Router();

const classController = require('../controllers/classController');
if (!classController || typeof classController.create !== 'function') {
  throw new Error('classController.create is missing or not a function');
}

const auth = require('../middlewares/authMiddleware');
if (!auth || typeof auth.requireAuth !== 'function') {
  throw new Error('auth middleware is missing or invalid');
}

const validators = require('../middlewares/validators');
const validate = validators && validators.validate;
const classSchema = validators && validators.classSchema;
if (!validate || !classSchema) {
  throw new Error('validators.validate or validators.classSchema is missing');
}

router.get('/', auth.requireAuth, auth.requireRole(['admin','teacher']), classController.list);
router.post('/', auth.requireAuth, auth.requireRole(['admin','teacher']), validate(classSchema), classController.create);
router.get('/:id', auth.requireAuth, auth.requireRole(['admin','teacher']), classController.get);

module.exports = router;
