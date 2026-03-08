const mongoose = require('mongoose');
const Attendance = require('../models/Attendance');

exports.markAttendance = async (req, res) => {
  try {
    const { date, classId, subjectId, records } = req.body;

    if (!date || !classId || !Array.isArray(records) || records.length === 0) {
      return res.status(400).json({ success: false, message: 'date, classId and records are required' });
    }

    if (!mongoose.Types.ObjectId.isValid(classId)) {
      return res.status(400).json({ success: false, message: 'Invalid classId' });
    }
    if (subjectId && !mongoose.Types.ObjectId.isValid(subjectId)) {
      return res.status(400).json({ success: false, message: 'Invalid subjectId' });
    }

    for (const r of records) {
      if (!r.studentId || !r.status) {
        return res.status(400).json({ success: false, message: 'each record must have studentId and status' });
      }
      if (!mongoose.Types.ObjectId.isValid(r.studentId)) {
        return res.status(400).json({ success: false, message: `Invalid studentId: ${r.studentId}` });
      }
      if (!['present','absent','late'].includes(r.status)) {
        return res.status(400).json({ success: false, message: 'invalid status value' });
      }
    }

    const start = new Date(date); start.setHours(0,0,0,0);
    const end = new Date(date); end.setHours(23,59,59,999);

    const query = { classId, date: { $gte: start, $lte: end } };
    if (subjectId) query.subjectId = subjectId;

    const exists = await Attendance.findOne(query);
    if (exists) {
      return res.status(409).json({ success: false, message: 'Attendance for this class/date/subject already recorded' });
    }

    const attendance = new Attendance({
      date: new Date(date),
      classId,
      subjectId,
      records,
      createdBy: req.user && req.user.id
    });

    await attendance.save();
    return res.status(201).json({ success: true, attendance });
  } catch (err) {
    console.error('attendance.markAttendance error:', err);
    // handle mongoose cast error defensively
    if (err.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid id format' });
    }
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
