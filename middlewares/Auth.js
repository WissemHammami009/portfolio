
const jwt = require("jsonwebtoken");
require('dotenv').config()
const isAuthenticate = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(400).json({ message: "Token required" });
  }

  // Check if token has three parts separated by "."
  const tokenParts = token.split('.');
  if (tokenParts.length !== 3) {
    return res.status(400).json({ message: "Malformed token, wrong structure" });
  }

  try {
    // Verify token using the secret key
    const decoded = await jwt.verify(token, process.env.MAIN_KEY);
    if (!decoded) {
      return res.status(403).json({ message: "Invalid Token" });
    }

    req.user = decoded;
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(403).json({ message: "Invalid Token" });
  }
};

const validateToken = async (req, res, next) => {
  const token = req.headers['x-access-token'];

  // console.log("Token:"+token)
  if (!token) {
    return res.status(401).json({ isValid: false, message: 'Token is missing' });
  }

  // Check if token has three parts separated by "."
  const tokenParts = token.split('.');
  if (tokenParts.length !== 3) {
    return res.status(400).json({ isValid: false, message: 'Malformed token, wrong structure' });
  }

  try {
    // Verify token with the secret key
    const decoded = await jwt.verify(token, process.env.MAIN_KEY);
    return res.status(200).json({ isValid: true });
  } catch (err) {
    return res.status(403).json({ isValid: false, message: 'Invalid token' });
  }
};

module.exports = {isAuthenticate,validateToken};