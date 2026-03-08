const authService = require('../services/authService');
const User = require('../models/User');
const { userDTO } = require('../dtos');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('LOGIN attempt for', email);
    const user = await User.findOne({ email }).lean();
    if (!user) {
      console.log('LOGIN: user not found for', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    console.log('LOGIN: user found, hasPassword=', !!user.password);
    const ok = await bcrypt.compare(password || '', user.password || '');
    console.log('LOGIN: password match =', ok);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const payload = { id: user._id.toString(), role: user.role || 'teacher' };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '1d' });
    return res.json({ success: true, token, user: { id: user._id, email: user.email, role: user.role } });
  } catch (err) {
    console.error('auth.login error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.verifyDevice = async (req, res) => {
  try {
    const user = await authService.verifyDevice(req.params.userId);
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getPendingVerifications = async (req, res) => {
  try {
    const users = await User.find({ isDeviceVerified: false });
    res.json(users.map(userDTO));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
