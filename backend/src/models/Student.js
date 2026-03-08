const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  phone: { type: String },
  email: { type: String }
}, { _id: false });

const StudentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  admissionNumber: { type: String, unique: true, sparse: true },
  dob: { type: Date },
  gender: { type: String, enum: ['male','female','other'] },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  contact: { type: ContactSchema },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);
