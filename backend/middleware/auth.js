// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // 1. Get token from header
  const token = req.header('x-auth-token');

  // 2. Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // 3. Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Add user from payload to the request object
    next(); // Move on to the next piece of middleware/route
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};