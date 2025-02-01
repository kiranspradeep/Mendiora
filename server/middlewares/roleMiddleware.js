const roleMiddleware = (allowedRoles) => (req, res, next) => {
  const userRole = req.user?.role;
  // console.log(req.user);
  

  if (!userRole || !allowedRoles.includes(userRole)) {
    return res.status(403).json({ message: "Access denied" });
  }

  next();
};

module.exports = roleMiddleware;
