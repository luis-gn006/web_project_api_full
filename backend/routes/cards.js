const cardsRouter = require('express').Router();
const { doesCardExist } = require('../middleware/doesSourceExist');

const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

cardsRouter.get('/cards', getCards);
cardsRouter.post('/cards', createCard);
cardsRouter.delete('/cards/:cardId', doesCardExist, deleteCard);
cardsRouter.put('/cards/:cardId/likes', doesCardExist, likeCard);
cardsRouter.delete('/cards/:cardId/likes', doesCardExist, dislikeCard);

module.exports = cardsRouter;
