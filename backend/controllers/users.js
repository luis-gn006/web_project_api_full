const userSchema = require('../models/user');
const bcrypt = require("bcrypt");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
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
  const { email, password, name, about, avatar } = req.body;
  const hash = bcrypt.hash(password, 10);
  userSchema.create({ email, password: hash, name, about, avatar })
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

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  userSchema.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect password or email'));
      }
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        // los hashes no coinciden, se rechaza el promise
        return Promise.reject(new Error('Incorrect password or email'));
      }
      // autenticación exitosa
      const token = jwt.sign({ _id: user._id }, 'secret-super-duper',{expiresIn: '7d'});
      res.send({token});
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};