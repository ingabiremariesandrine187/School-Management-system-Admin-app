const teacherService = require('../services/teacherService');

exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await teacherService.getAllTeachers();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTeacherById = async (req, res) => {
  try {
    const teacher = await teacherService.getTeacherById(req.params.id);
    res.json(teacher);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.createTeacher = async (req, res) => {
  try {
    const teacher = await teacherService.createTeacher(req.body);
    res.status(201).json(teacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateTeacher = async (req, res) => {
  try {
    const teacher = await teacherService.updateTeacher(req.params.id, req.body);
    res.json(teacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTeacher = async (req, res) => {
  try {
    const result = await teacherService.deleteTeacher(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
