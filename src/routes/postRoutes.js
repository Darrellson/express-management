const express = require('express');
const { createPost, getUserPosts, getPostById } = require('../controllers/postController');
const authenticateToken = require('../auth/authenticateToken');

const router = express.Router();

router.post('/', authenticateToken, createPost);
router.get('/', authenticateToken, getUserPosts);
router.get('/:id', authenticateToken, getPostById);

module.exports = router;
