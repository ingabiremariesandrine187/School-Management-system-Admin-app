const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Student = require('../models/Student');
const { userDTO } = require('../dtos');

exports.login = async (email, password, deviceId) => {
  const user = await User.findOne({ email });
  
  if (!user || !user.comparePassword(password)) {
    throw new Error('Invalid credentials');
  }

  if (user.role !== 'admin' && !user.isDeviceVerified) {
    throw new Error('Device not verified');
  }

  if (deviceId && user.deviceId !== deviceId) {
    user.deviceId = deviceId;
    user.isDeviceVerified = false;
    await user.save();
    throw new Error('New device detected. Awaiting admin verification');
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });

  return { token, user: userDTO(user) };
};

exports.register = async (userData) => {
  const user = new User(userData);
  user.password = user.hashPassword(userData.password);
  await user.save();
  
  // If user is a student, create a student record
  if (userData.role === 'student') {
    const student = await Student.create({
      name: userData.name,
      email: userData.email,
      feeBalance: 0
    });
    user.studentId = student._id;
    await user.save();
  }
  
  return userDTO(user);
};

exports.verifyDevice = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');
  
  user.isDeviceVerified = true;
  await user.save();
  return userDTO(user);
};
