const { uuid } = require('uuidv4');
const User = require('../models/User');
const Post = require('../models/Post');

module.exports = {
  async index(req, res) {
    const posts = await Post.findAll();

    return res.json(posts);
  },

  async show(req, res) {
    const { postId } = req.params;

    const post = await Post.findByPk(postId);

    return res.json(post);
  },

  async store(req, res) {
    try {
      const { userId } = req.params;

      const { title, description, date, readTime, article } = req.body;

      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(400).json({ error: 'User not Found' });
      }

      const post = {
        id: uuid(),
        userId,
        title,
        description,
        date,
        readTime,
        article,
      };

      await Post.create(post);

      return res.send({
        post,
      });
    } catch (err) {
      return res.status(500).json({ error: 'Post can not be created' });
    }
  },

  async update(req, res) {
    try {
      const { postId } = req.params;
      const { title, description, date, readTime, article } = req.body;

      const post = {
        id: uuid(),
        title,
        description,
        date,
        readTime,
        article,
      };

      await Post.update(post, {
        where: { id: postId },
      });

      delete post.password;

      return res.status(200).json(post);
    } catch (err) {
      return res.status(500).json({ error: 'Post can not be updated' });
    }
  },

  async destroy(req, res) {
    try {
      const { postId } = req.params;

      const post = await Post.findByPk(postId);

      if (!post) {
        return res.status(400).json({ error: 'Post not found' });
      }

      await post.destroy();

      return res.status(204).send();
    } catch (err) {
      return res.status(500).json({
        error: 'Post can not be excluded',
      });
    }
  },
};
