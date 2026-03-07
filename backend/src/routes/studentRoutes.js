const express = require('express');
const studentController = require('../controllers/studentController');
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

router.use(protect);
router.use(authorize('admin', 'teacher'));

router.get('/', studentController.getAllStudents);
router.get('/:id', studentController.getStudentById);
router.post('/', studentController.createStudent);
router.put('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);
router.get('/:id/grades', studentController.getStudentGrades);
router.get('/:id/attendance', studentController.getStudentAttendance);

module.exports = router;
