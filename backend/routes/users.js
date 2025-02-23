const usersRouter = require('express').Router();
const { doesUserExist } = require('../middleware/doesSourceExist');
const { celebrate, Joi } = require("celebrate");
const validator = require("validator");

const {
  getUser, getCurrentUser, getUsers, updateUser, updateAvatar,
} = require('../controllers/users');
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
}

usersRouter.get('/users', getUsers);
usersRouter.get('/users/me', getCurrentUser);
usersRouter.patch('/users/me',
  celebrate({
      body: Joi.object().keys({
        name: Joi.string().required().min(2).max(30),
        about: Joi.string().required().min(2).max(100),
      }),
    }),
  updateUser);
usersRouter.get('/users/:id', doesUserExist, getUser);
/*usersRouter.post('/users', createUser);*/
usersRouter.patch('/users/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().custom(validateURL),
    }),
  }),
  updateAvatar);

module.exports = usersRouter;
