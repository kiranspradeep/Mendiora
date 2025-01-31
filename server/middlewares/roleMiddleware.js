const jwt = require('jsonwebtoken');
const OrganizerAdmin = require('../models/OrganizerAdminModel'); // Adjust the path to your User model

const roleMiddleware = (roles) => {
  return async (req, res, next) => {
    try {
      // Get the token from the Authorization header
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
      }

      // Verify and decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRETKEY); // Ensure `JWT_SECRET` is defined in your environment variables
      
      // Fetch user from the database
      const user = await OrganizerAdmin.findById(decoded.userId); // Assumes the token contains `id`
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Attach user and role to the request object
      req.user = { _id: user._id, role: user.role };
      console.log(req.user);
      
      // Check if the user's role is in the allowed roles
      if (!roles.includes(user.role)) {
        return res.status(403).json({ message: 'Access denied' });
      }

      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error: ' + error.message });
    }
  };
};

module.exports = roleMiddleware;
