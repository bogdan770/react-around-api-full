const Card = require('../models/card');
const MiddlewareError = require('../middlewares/MiddlewareError');
const { DocumentNotFoundError } = require('./error');

const OK = 200;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;

const badRequsetText = 'Bad request';
const serverErrorText = 'An internal program error has occured';

const getCards = (req, res, next) => {
  Card.find({})
    .orFail(() => {
      throw new MiddlewareError('There is no card with this ID', NOT_FOUND);
    })
    .then((cardsData) => {
      console.log(cardsData);
      res.status(OK).send(cardsData);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link, owner = req.user._id } = req.body;
  Card.create({ name, link, owner })

    .then((cardsData) => {
      res.status(OK).send(cardsData);
    })

    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new MiddlewareError(badRequsetText, BAD_REQUEST));
      }
      else {
        return next(new MiddlewareError(serverErrorText, SERVER_ERROR));
      }
      return next(err);
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.deleteOne({ _id: cardId })
    .orFail(DocumentNotFoundError)
    .then((card) => {
      if (!card.owner === req.user._id.toStrind()) {
        return Promise.reject(new MiddlewareError('It is not your card!'));
      }
      Card.deleteOne(card).then(() => res.status(OK).send({data: card}));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new MiddlewareError(badRequsetText, BAD_REQUEST));
      }
      return next(new MiddlewareError(serverErrorText, SERVER_ERROR));
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(DocumentNotFoundError)
    .then((card) => {
      res.status(OK).send(card);
    })

    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new MiddlewareError(badRequsetText, BAD_REQUEST));
      }
      return next(new MiddlewareError(serverErrorText, SERVER_ERROR));
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(DocumentNotFoundError)
    .then((card) => {
      res.status(OK).send(card);
    })

    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new MiddlewareError(badRequsetText, BAD_REQUEST));
      }
      return next(new MiddlewareError(serverErrorText, SERVER_ERROR));
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  dislikeCard,
  likeCard,
};
