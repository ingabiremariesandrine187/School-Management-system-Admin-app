const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'teacher', 'student', 'parent'], required: true },
  deviceId: { type: String },
  isDeviceVerified: { type: Boolean, default: false },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  createdAt: { type: Date, default: Date.now }
});

userSchema.methods.hashPassword = function(password) {
  return crypto.createHash('sha512').update(password).digest('hex');
};

userSchema.methods.comparePassword = function(password) {
  return this.password === crypto.createHash('sha512').update(password).digest('hex');
};

module.exports = mongoose.model('User', userSchema);
