const express = require('express');
const teacherController = require('../controllers/teacherController');
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.get('/', teacherController.getAllTeachers);
router.get('/:id', teacherController.getTeacherById);
router.post('/', teacherController.createTeacher);
router.put('/:id', teacherController.updateTeacher);
router.delete('/:id', teacherController.deleteTeacher);

module.exports = router;
