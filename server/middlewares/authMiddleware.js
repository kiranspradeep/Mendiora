const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  
  
  if (!token) {
    
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
    req.user = decoded;
    
    
    
    next();
  } catch (error) {
    const errorMessage =
      error.name === "TokenExpiredError"
        ? "Token expired"
        : error.name === "JsonWebTokenError"
        ? "Invalid token"
        : "Authentication error";
    return res.status(401).json({ message: errorMessage });
  }
};

module.exports = authMiddleware;
