const studentService = require('../services/studentService');

exports.getAllStudents = async (req, res) => {
  try {
    const students = await studentService.getAllStudents();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const student = await studentService.getStudentById(req.params.id);
    res.json(student);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.createStudent = async (req, res) => {
  try {
    const student = await studentService.createStudent(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const student = await studentService.updateStudent(req.params.id, req.body);
    res.json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const result = await studentService.deleteStudent(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getStudentGrades = async (req, res) => {
  try {
    const grades = await studentService.getStudentGrades(req.params.id);
    res.json(grades);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getStudentAttendance = async (req, res) => {
  try {
    const attendance = await studentService.getStudentAttendance(req.params.id);
    res.json(attendance);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
