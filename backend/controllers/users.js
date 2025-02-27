const userSchema = require('../models/user');
const bcrypt = require("bcrypt");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const ApiError = require('../components/ApiError');
const ValidationError = require('../components/ValidationError');
require("dotenv").config();

const { JWT_SECRET } = process.env;

module.exports.getUsers = (req, res) => {
  userSchema.find({})
    .then((user) => res.json( user ))
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
    .then((user) => res.json( user ))
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
  bcrypt.hash(password, 10).then((hash) => {
    userSchema.create({ email, password: hash, name, about, avatar })
    .then((user) => res.status(201).json({ _id: user._id, email: user.email }))
    .catch((err) => res.status(400).send({ error: err.message }));
  });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  userSchema.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => res.send({ message: 'Usuario actualizado'}, user ))
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
    .then((user) => res.send({ message: 'Usuario actualizado'}, user ))
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

  userSchema.findUserByCredentials(email, password)
    .then((user) => {

      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );
      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

module.exports.getCurrentUser = (req,res) => {
  userSchema.findById({ _id: req.user._id })
  .orFail(() => {
    const serverError = new ApiError();
      res.status(serverError.statusCode).send({
        error: {
          name: serverError.name,
          message: serverError.message,
          statusCode: serverError.statusCode,
        },
      });
  })
  .then((user) => {
    res.json(user);
  })

  .catch((err) => {
    const statusCode = err.statusCode || 500;
    res
      .status(statusCode)
      .send({ message: "Error finding User", error: err.message });
  });
}