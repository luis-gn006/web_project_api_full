const cardsSchema = require('../models/card');
const serverError = require('../components/errorHandlers');
const ValidationError = require('../components/ValidationError');

module.exports.getCards = (req, res) => {
  cardsSchema.find({})
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      res.status(500).send({
        error: {
          name: serverError.name,
          message: serverError.message,
          statusCode: 500,
        },
      });
    });
};

module.exports.createCard = (req, res) => {
  owner = req.user._id;
  const { name, link } = req.body;
  cardsSchema.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const validatorError = new ValidationError();
        res.status(validatorError.statusCode).send({
          validatorError
        });
      } else {
        const serverError = new ApiError();
        res.status(serverError.statusCode).send({
          error: {
            name: serverError.name,
            message: serverError.message,
            statusCode: serverError.statusCode,
          },
        });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  cardsSchema.findByIdAndDelete(req.params.cardId)
    .then((card) => res.send({ message: 'Tarjeta eliminada', data: card }))
    .catch((err) => {
      const serverError = new ApiError();
      res.status(serverError.statusCode).send({
        error: {
          name: serverError.name,
          message: serverError.message,
          statusCode: serverError.statusCode,
        },
      });
    });
};

module.exports.likeCard = (req, res) => {
  cardsSchema.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ message: 'Tarjeta actualizada', data: card }))
    .catch((err) => {
      const serverError = new ApiError();
      res.status(serverError.statusCode).send({
        error: {
          name: serverError.name,
          message: serverError.message,
          statusCode: serverError.statusCode,
        },
      });
    });
};

module.exports.dislikeCard = (req, res) => {
  cardsSchema.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ message: 'Tarjeta actualizada', data: card }))
    .catch((err) => {
      const serverError = new ApiError();
      res.status(serverError.statusCode).send({
        error: {
          name: serverError.name,
          message: serverError.message,
          statusCode: serverError.statusCode,
        },
      });
    });
};
