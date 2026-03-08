const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
  name: { type: String, required: true },            // e.g. "Primary 1A"
  level: { type: String },                           // e.g. "P1" or "Grade 1"
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // assigned teacher
  subjectIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Class', ClassSchema);
