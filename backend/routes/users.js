const usersRouter = require('express').Router();
const { doesUserExist } = require('../middleware/doesSourceExist');

const {
  getUser, getCurrentUser, getUsers, updateUser, updateAvatar,
} = require('../controllers/users');

usersRouter.get('/users', getUsers);
usersRouter.patch('/users/me', getCurrentUser);
usersRouter.get('/users/:id', doesUserExist, getUser);
/*usersRouter.post('/users', createUser);*/
usersRouter.patch('/users/me/avatar', updateAvatar);

module.exports = usersRouter;
