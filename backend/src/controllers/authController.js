const authService = require('../services/authService');
const User = require('../models/User');
const { userDTO } = require('../dtos');

exports.login = async (req, res) => {
  try {
    const { email, password, deviceId } = req.body;
    const result = await authService.login(email, password, deviceId);
    res.json(result);
  } catch (error) {
    res.status(401).json({ message: error.message });
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
