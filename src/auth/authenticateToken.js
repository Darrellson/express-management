const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
  // Extract token from Authorization header or cookies
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : req.cookies.token;

  if (!token) return res.status(401).json({ error: 'Access Denied' });

  try {
    // Verify the token
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified; // Attach decoded token payload to `req.user`
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid Token' });
  }
};

module.exports = authenticateToken;
