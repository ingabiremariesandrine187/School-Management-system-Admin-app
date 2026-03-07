const Student = require('../models/Student');
const { studentDTO } = require('../dtos');

exports.getAllStudents = async () => {
  const students = await Student.find().populate('classId');
  return students.map(studentDTO);
};

exports.getStudentById = async (id) => {
  const student = await Student.findById(id).populate('classId');
  if (!student) throw new Error('Student not found');
  return studentDTO(student);
};

exports.createStudent = async (data) => {
  const student = await Student.create(data);
  return studentDTO(student);
};

exports.updateStudent = async (id, data) => {
  const student = await Student.findByIdAndUpdate(id, data, { new: true });
  if (!student) throw new Error('Student not found');
  return studentDTO(student);
};

exports.deleteStudent = async (id) => {
  const student = await Student.findByIdAndDelete(id);
  if (!student) throw new Error('Student not found');
  return { message: 'Student deleted' };
};

exports.getStudentGrades = async (id) => {
  const student = await Student.findById(id);
  if (!student) throw new Error('Student not found');
  return student.grades;
};

exports.getStudentAttendance = async (id) => {
  const student = await Student.findById(id);
  if (!student) throw new Error('Student not found');
  return student.attendance;
};
