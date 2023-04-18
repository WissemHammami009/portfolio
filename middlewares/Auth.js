
const jwt = require("jsonwebtoken");
require('dotenv').config()
const isAuthenticate = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(400).json({ message: "Token required" });
  }

  const decoded = await jwt.decode(token, process.env.SECRET_KEY);
  if (!decoded) {
    return res.status(403).json({ message: "Invalid Token" });
  }

  req.user = decoded;
  next();
};

module.exports = isAuthenticate;