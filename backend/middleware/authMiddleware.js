const jwt = require("jsonwebtoken");

const AuthMiddleware = (req, res, next) => {
  const userJwt = req.cookies?.token || req.headers.authorization;

  try {
    if (!userJwt) {
      return res.status(401).json({
        success: false,
        message: "Please login to access this resource",
      });
    }

    const decoded = jwt.verify(userJwt, process.env.SECREATKEY);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized !!" });
    } else {
      req.userID = decoded.payload;
      req.email = decoded.email;
      next();
    }
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = AuthMiddleware;
