const express = require('express');
const {
  register,
  login,
  refreshAccessToken,
  logout,
} = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refreshAccessToken); // Endpoint for refreshing access tokens
router.post('/logout', logout);

module.exports = router;
