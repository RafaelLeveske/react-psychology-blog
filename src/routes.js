const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');
const PostController = require('./controllers/PostController');

const authMiddleware = require('./middlewares/auth');

const routes = express.Router();

const upload = multer(uploadConfig);

routes.get('/users', UserController.index);
routes.get('/users/:userId', UserController.show);
routes.post('/users', upload.single('avatar'), UserController.store);
routes.put(
  '/users/:userId',
  upload.single('avatar'),
  authMiddleware,
  UserController.update,
);
routes.delete('/users/:userId', authMiddleware, UserController.destroy);

routes.post('/sessions', SessionController.store);

routes.get('/posts', PostController.index);
routes.get('/posts/:postId', PostController.show);
routes.post('/posts/:userId', authMiddleware, PostController.store);
routes.put('/posts/:postId', authMiddleware, PostController.update);
routes.delete('/posts/:postId', authMiddleware, PostController.destroy);

module.exports = routes;
