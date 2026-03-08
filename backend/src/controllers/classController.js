const classService = require('../services/classService');
const mongoose = require('mongoose');
const ClassModel = require('../models/Class');

async function create(req, res) {
  try {
    const { name, level, teacherId, subjectIds, notes } = req.body;
    if (!name) return res.status(400).json({ message: 'name required' });
    if (teacherId && !mongoose.Types.ObjectId.isValid(teacherId)) {
      return res.status(400).json({ message: 'Invalid teacherId' });
    }
    const cls = await ClassModel.create({ name, level, teacherId, subjectIds, notes });
    return res.status(201).json(cls);
  } catch (err) {
    console.error('classController.create', err);
    return res.status(500).json({ message: 'Server error' });
  }
}

async function list(req, res) {
  try {
    const classes = await ClassModel.find({}).populate('teacherId', 'name').lean();
    return res.json(classes);
  } catch (err) {
    console.error('classController.list', err);
    return res.status(500).json({ message: 'Server error' });
  }
}

async function get(req, res) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' });
    const cls = await ClassModel.findById(id).populate('teacherId', 'name').lean();
    if (!cls) return res.status(404).json({ message: 'Not found' });
    return res.json(cls);
  } catch (err) {
    console.error('classController.get', err);
    return res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { create, list, get };
