const Class = require('../models/Class');
const { classDTO } = require('../dtos');

exports.getAllClasses = async () => {
  const classes = await Class.find().populate('teacherId');
  return classes.map(classDTO);
};

exports.getClassById = async (id) => {
  const classData = await Class.findById(id).populate('teacherId');
  if (!classData) throw new Error('Class not found');
  return classDTO(classData);
};

exports.createClass = async (data) => {
  const classData = await Class.create(data);
  return classDTO(classData);
};

exports.updateClass = async (id, data) => {
  const classData = await Class.findByIdAndUpdate(id, data, { new: true });
  if (!classData) throw new Error('Class not found');
  return classDTO(classData);
};

exports.deleteClass = async (id) => {
  const classData = await Class.findByIdAndDelete(id);
  if (!classData) throw new Error('Class not found');
  return { message: 'Class deleted' };
};
