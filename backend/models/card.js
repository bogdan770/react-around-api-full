const mongoose = require('mongoose');

const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: validator.isURL,
      message: 'The "Link" needs to be a valid url',
    },
  },

  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },

  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      default: '',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
