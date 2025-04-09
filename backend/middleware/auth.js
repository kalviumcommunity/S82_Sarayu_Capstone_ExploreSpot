const jwt = require("jsonwebtoken");
const User = require("../model/user");
const ErrorHandler = require("../utils/ErrorHandler");

exports.isAuthenticated = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return next(new ErrorHandler("Invalid or expired token", 401));
  }
};
