const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getUserById, createUser, updatedUserAvatar, updatedUserProfile, login,
} = require('../controllers/users');

const auth = require('../middlewares/auth');

usersRouter.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().required().min(4),
  }),
}), login);
usersRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().required().min(4),
  }),
}), createUser);
usersRouter.use(auth);

usersRouter.get('/', getUsers);

usersRouter.get('/:id', celebrate({
  body: Joi.object().keys({
    id: Joi.string().required().alphanum().length(24)
      .hex(),
  }),
}), getUserById);

usersRouter.post('/', createUser);
usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updatedUserProfile);

usersRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().uri(),
  }),
}), updatedUserAvatar);
module.exports = {usersRouter};
