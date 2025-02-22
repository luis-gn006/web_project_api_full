const notFoundRouter = require('express').Router();
const { errMessage, errName } = require('../enums/errorHandlers.enum.js');
const { serverError } = require('../components/errorHandlers');

// Con enum
/*
notFoundRouter.all('*', (req, res) => {
  res.status(500).send({
    error: {
      name: errName.server,
      message: errMessage.server,
    },
  });
});
*/

//Con clases
notFoundRouter.all('*', (req, res) => {
  res.status(serverError.statusCode).send({
    error: {
      name: serverError.name,
      message: serverError.message,
    }
  });
});

module.exports = notFoundRouter;
