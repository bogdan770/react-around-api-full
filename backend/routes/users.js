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
usersRouter.get('/:id', getUserById);
usersRouter.post('/', createUser);
usersRouter.patch('/me', updatedUserProfile);
usersRouter.patch('/me/avatar', updatedUserAvatar);
module.exports = {usersRouter};
