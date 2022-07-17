const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const { DocumentNotFoundError } = require('./error');

const MiddlewareError = require('../middlewares/MiddlewareError');

const { NODE_ENV, JWT_SECRET } = process.env;

const User = require('../models/user');

const OK = 200;
const BAD_REQUEST = 400;
const BAD_METHOD = 401;
const NOT_FOUND = 404;
const CONFLICT = 409;
const SERVER_ERROR = 500;

const badRequsetText = 'Bad request';
const serverErrorText = 'An internal program error has occured';

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        return next(new MiddlewareError('This user does not extist', NOT_FOUND));
      }
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        {
          expiresIn: '7d',
        },
      );
      res.send({ data: user.toJSON(), token });
    })
    .catch(() => {
      return next(new MiddlewareError('Incorrect email or password', BAD_METHOD));
    });
};

const getUsers = (req, res, next) => {
  User.find({})
    .orFail(() => {
      throw new MiddlewareError('User with this ID was found', NOT_FOUND);
    })
    .then((users) => res.status(OK).send(users))
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(DocumentNotFoundError)
    .then((user) => res.status(OK).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new MiddlewareError(badRequsetText, BAD_REQUEST));
      } if (err.statusCode === NOT_FOUND) {
        return next(new MiddlewareError('Not found', NOT_FOUND));
      }
      return next(new MiddlewareError(serverErrorText, SERVER_ERROR));
    });
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        return next(new MiddlewareError('The user with the provided email already exists', CONFLICT));
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
        .then((user) => {
          res.status(OK).send({ _id: user._id, email: user.email });
        })
        .catch((err) => {
          if (err.name === 'MongoServerError' && err.code === 11000) {
            return next(new MiddlewareError('User already exists', CONFLICT));
          }
          else {
            next(new MiddlewareError(serverErrorText, SERVER_ERROR));
          }
          return next(err);
        });
    });
};

const updatedUserProfile = (req, res) => {
  const id = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(DocumentNotFoundError)
    .then((updatedUser) => res.status(200).send({ message: `User ${updatedUser.id} was updated successfully` }))

    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Invalid Input' });
      }
      if (err.name === 'Not Found') {
        res.status(404).send({ message: `${err.message}` });
        return;
      }

      res.status(500).send({ message: `${err.message}` });
    });
};

const updatedUserAvatar = (req, res, next) => {
  const id = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    id,
    { avatar },
    { new: true, runValidators: true },
  )

    .orFail(DocumentNotFoundError)
    .then((data) => res.status(OK).send({ data }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new MiddlewareError(badRequsetText, BAD_REQUEST));
      }
      else {
        next(new MiddlewareError(serverErrorText, SERVER_ERROR));
      }
      return next(err);
    })
    .catch(next);
};

module.exports = {
  login,
  getUsers,
  getUserById,
  createUser,
  updatedUserProfile,
  updatedUserAvatar,
};
