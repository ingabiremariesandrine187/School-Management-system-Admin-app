const jwt = require('jsonwebtoken');

exports.requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('AUTH: missing Authorization header');
    return res.status(401).json({ message: 'Missing or invalid Authorization header' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
    console.log('AUTH decoded token:', decoded);
    req.user = decoded;
    return next();
  } catch (err) {
    console.error('AUTH error:', err.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

exports.requireRole = (allowed) => {
  const roles = Array.isArray(allowed) ? allowed : [allowed];
  return (req, res, next) => {
    console.log('requireRole, req.user =', req.user, 'allowed=', roles);
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    if (!roles.includes(req.user.role)) {
      console.log('requireRole: forbidden, user role=', req.user.role);
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
};