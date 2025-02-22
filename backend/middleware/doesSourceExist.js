const Card = require('../models/card');
const User = require('../models/user');
const { notFoundError } = require('../components/errorHandlers')

const doesSourceExist = async (sourceId, model , req, res ,next) => {
  try {
    const source = await model.findById(sourceId).orFail();
    req[source.constructor.modelName.toLowerCase()] = source;
    next();
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(404).send({
        error: {
          name: notFoundError.name,
          message: notFoundError.message,
        },
      });
    }
  }
}

const doesCardExist = async (req, res, next) => {
  doesSourceExist(req.params.cardId, Card, req, res, next);
};
const doesUserExist = (req, res, next) => {
  doesSourceExist(req.params.id, User, req, res, next);
};

module.exports = { doesCardExist, doesUserExist };
