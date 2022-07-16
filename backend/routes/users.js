const usersRouter = require('express').Router();

const {
  getUsers, getUserById, createUser, updatedUserAvatar, updatedUserProfile,
} = require('../controllers/users');

usersRouter.get('/', getUsers);

usersRouter.get('/:id', getUserById);

usersRouter.post('/', createUser);

usersRouter.patch('/me', updatedUserProfile);

usersRouter.patch('/me/avatar', updatedUserAvatar);

module.exports = {usersRouter};
