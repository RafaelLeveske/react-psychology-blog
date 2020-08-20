const { uuid } = require('uuidv4');
const { hash } = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authConfig = require('../config/auth');

module.exports = {
  async index(req, res) {
    const users = await User.findAll();

    delete users.password;

    return res.json(users);
  },
  async show(req, res) {
    const { userId } = req.params;

    const user = await User.findByPk(userId);

    return res.json(user);
  },

  async store(req, res) {
    function genetateToken(params = {}) {
      return jwt.sign(params, authConfig.secret, {
        expiresIn: '1d',
      });
    }
    try {
      const {
        imageUrl,
        name,
        email,
        password,
        description,
        firstSocialMediaUrl,
        secondSocialMediaUrl,
        thirdSocialMediaUrl,
      } = req.body;

      const checkUserExists = await User.findOne({ where: { email } });
      if (checkUserExists) {
        return res.json({ error: 'E-mail address already used' }, 401);
      }

      const hashedPassword = await hash(password, 8);

      const user = {
        id: uuid(),
        avatar: req.file.filename,
        imageUrl,
        name,
        description,
        email,
        password: hashedPassword,
        firstSocialMediaUrl,
        secondSocialMediaUrl,
        thirdSocialMediaUrl,
      };

      await User.create(user);

      delete user.password;

      return res.send({
        user,
        token: genetateToken({ id: user.id }),
      });
    } catch (err) {
      return res.status(400).json({ error: 'User can not be created' });
    }
  },
  async update(req, res) {
    try {
      const { userId } = req.params;
      const {
        imageUrl,
        name,
        email,
        password,
        description,
        firstSocialMediaUrl,
        secondSocialMediaUrl,
        thirdSocialMediaUrl,
      } = req.body;

      const hashedPassword = await hash(password, 8);

      const user = {
        id: uuid(),
        imageUrl,
        avatar: req.file.filename,
        name,
        description,
        email,
        password: hashedPassword,
        firstSocialMediaUrl,
        secondSocialMediaUrl,
        thirdSocialMediaUrl,
      };

      await User.update(user, {
        where: { id: userId },
      });

      delete user.password;

      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ error: 'User can not be updated' });
    }
  },

  async destroy(req, res) {
    try {
      const { userId } = req.params;

      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      await user.destroy();

      return res.status(204).send();
    } catch (err) {
      return res.status(500).json({
        error: 'User can not be excluded',
      });
    }
  },
};
