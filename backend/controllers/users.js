const userSchema = require('../models/user');
const ApiError = require('../components/ApiError');
const ValidationError = require('../components/ValidationError');

module.exports.getUsers = (req, res) => {
  userSchema.find({})
    .then((user) => res.send({ data: user }))
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

module.exports.getUser = (req, res) => {
  userSchema.findById(req.params.id)
    .then((user) => res.send({ data: user }))
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

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  userSchema.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const validatorError = new ValidationError();
        res.status(validatorError.statusCode).send({
          error: {
            name: validatorError.name,
            message: validatorError.message,
            statusCode: validatorError.statusCode,
          },
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

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  userSchema.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => res.send({ message: 'Usuario actualizado', data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const validatorError = new ValidationError();
        res.status(validatorError.statusCode).send({
          error: {
            name: validatorError.name,
            message: validatorError.message,
            statusCode: validatorError.statusCode,
          },
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

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  userSchema.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send({ message: 'Usuario actualizado', data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const validatorError = new ValidationError();
        res.status(validatorError.statusCode).send({
          error: {
            name: validatorError.name,
            message: validatorError.message,
            statusCode: validatorError.statusCode,
          },
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
