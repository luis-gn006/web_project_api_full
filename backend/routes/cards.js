const cardsRouter = require('express').Router();
const { doesCardExist } = require('../middleware/doesSourceExist');
const { celebrate, Joi } = require("celebrate");
const validator = require("validator");

const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
}

cardsRouter.get('/cards', getCards);
cardsRouter.post('/cards',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().custom(validateURL),
    }),
  }),
  createCard);
cardsRouter.delete('/cards/:cardId', doesCardExist, deleteCard);
cardsRouter.put('/cards/likes/:cardId', doesCardExist, likeCard);
cardsRouter.delete('/cards/likes/:cardId', doesCardExist, dislikeCard);

module.exports = cardsRouter;
