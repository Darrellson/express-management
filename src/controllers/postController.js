const prisma = require('../utils/prismaClient');

const createPost = async (req, res) => {
  const { title, content } = req.body;

  try {
    const post = await prisma.post.create({
      data: { title, content, userId: req.user.id },
    });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({ where: { userId: req.user.id } });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await prisma.post.findUnique({ where: { id: parseInt(id) } });
    if (!post || post.userId !== req.user.id) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch post' });
  }
};

module.exports = { createPost, getUserPosts, getPostById };
