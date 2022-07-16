const mongoose = require('mongoose');

const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Bogdan Sliusarenko',
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Web developer',
  },
  avatar: {
    type: String,
    required: true,
    default: 'https://a.allegroimg.com/s512/11c2cd/fc4f0efe44ba9bb96d1ba120a184/Maskotka-Muppety-Kermit-40-cm',
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'The "avatar" must be a valid url',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'The "email" must be a valid email address',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
