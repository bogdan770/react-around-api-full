const cardsRouter = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const {
  getCards, createCard, deleteCard, dislikeCard, likeCard,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);
cardsRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri(),
  }),
}), createCard);

cardsRouter.delete('/:cardId', celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24)
      .hex(),
  }),
}), deleteCard);

cardsRouter.put('/:cardId/likes', celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24)
      .hex(),
  }),
}), likeCard);

cardsRouter.delete('/:cardId/likes', celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24)
      .hex(),
  }),
}), dislikeCard);
module.exports = {cardsRouter};
