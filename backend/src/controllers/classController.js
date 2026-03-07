const classService = require('../services/classService');

exports.getAllClasses = async (req, res) => {
  try {
    const classes = await classService.getAllClasses();
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getClassById = async (req, res) => {
  try {
    const classData = await classService.getClassById(req.params.id);
    res.json(classData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.createClass = async (req, res) => {
  try {
    const classData = await classService.createClass(req.body);
    res.status(201).json(classData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateClass = async (req, res) => {
  try {
    const classData = await classService.updateClass(req.params.id, req.body);
    res.json(classData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteClass = async (req, res) => {
  try {
    const result = await classService.deleteClass(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
