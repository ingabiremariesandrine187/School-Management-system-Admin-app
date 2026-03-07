const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
  feeBalance: { type: Number, default: 0 },
  grades: [{
    subject: String,
    score: Number,
    term: String,
    date: { type: Date, default: Date.now }
  }],
  attendance: [{
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ['present', 'absent', 'late'] }
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Student', studentSchema);
