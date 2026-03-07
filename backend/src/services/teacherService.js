const Teacher = require('../models/Teacher');
const { teacherDTO } = require('../dtos');

exports.getAllTeachers = async () => {
  const teachers = await Teacher.find().populate('userId assignedClasses');
  return teachers.map(teacherDTO);
};

exports.getTeacherById = async (id) => {
  const teacher = await Teacher.findById(id).populate('userId assignedClasses');
  if (!teacher) throw new Error('Teacher not found');
  return teacherDTO(teacher);
};

exports.createTeacher = async (data) => {
  const teacher = await Teacher.create(data);
  return teacherDTO(teacher);
};

exports.updateTeacher = async (id, data) => {
  const teacher = await Teacher.findByIdAndUpdate(id, data, { new: true });
  if (!teacher) throw new Error('Teacher not found');
  return teacherDTO(teacher);
};

exports.deleteTeacher = async (id) => {
  const teacher = await Teacher.findByIdAndDelete(id);
  if (!teacher) throw new Error('Teacher not found');
  return { message: 'Teacher deleted' };
};
