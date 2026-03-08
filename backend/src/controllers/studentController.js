const mongoose = require('mongoose');
const Student = (() => {
  try { return require('../models/Student'); } catch (e) { return null; }
})();

exports.list = async (req, res) => {
  try {
    if (!Student) return res.status(500).json({ message: 'Student model missing' });
    const q = req.query || {};
    const students = await Student.find(q).lean();
    return res.json(students);
  } catch (err) {
    console.error('studentController.list', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.get = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' });
    const s = await Student.findById(id).lean();
    if (!s) return res.status(404).json({ message: 'Not found' });
    return res.json(s);
  } catch (err) {
    console.error('studentController.get', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.create = async (req, res) => {
  try {
    if (!Student) return res.status(500).json({ message: 'Student model missing' });
    const payload = req.body || {};
    if (!payload.firstName) return res.status(400).json({ message: 'firstName required' });
    if (payload.classId && !mongoose.Types.ObjectId.isValid(payload.classId)) {
      return res.status(400).json({ message: 'Invalid classId' });
    }
    const created = await Student.create(payload);
    return res.status(201).json(created);
  } catch (err) {
    console.error('studentController.create', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body || {};
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' });
    if (payload.classId && !mongoose.Types.ObjectId.isValid(payload.classId)) {
      return res.status(400).json({ message: 'Invalid classId' });
    }
    const updated = await Student.findByIdAndUpdate(id, payload, { new: true, runValidators: true }).lean();
    if (!updated) return res.status(404).json({ message: 'Not found' });
    return res.json(updated);
  } catch (err) {
    console.error('studentController.update', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' });
    const deleted = await Student.findByIdAndDelete(id).lean();
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    return res.json({ message: 'Deleted' });
  } catch (err) {
    console.error('studentController.remove', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.byClass = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid class id' });
    const list = await Student.find({ classId: id }).lean();
    return res.json(list);
  } catch (err) {
    console.error('studentController.byClass', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
