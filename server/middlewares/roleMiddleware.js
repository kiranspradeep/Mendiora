const jwt = require('jsonwebtoken');
const OrganizerAdmin = require('../models/OrganizerAdminModel');

const roleMiddleware = (roles) => async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
    const user = await OrganizerAdmin.findById(decoded.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    req.user = { _id: user._id, role: user.role };
    if (!roles.includes(user.role)) return res.status(403).json({ message: 'Access denied' });

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

module.exports = roleMiddleware;

