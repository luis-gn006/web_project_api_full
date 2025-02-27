const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const notFoundRouter = require('./routes/notFound');
const {login, createUser} = require('./controllers/users');
const auth = require("./middleware/auth");
const cors = require("cors");

const { celebrate, Joi, errors } = require("celebrate");
const { requestLogger, errorLogger } = require('./middleware/logger');

mongoose.connect('mongodb://localhost:27017/aroundb')
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

const { PORT = 3000 } = process.env;


const app = express();
app.use(express.json());
app.use(requestLogger);

app.use(cors());
app.options("*", cors());

const allowedCors = [
  "http://localhost:3001",
  "https://www.triparound.mooo.com",
  "https://triparound.mooo.com",
];

app.use(cors({ origin: allowedCors }));


/*
app.use((req, res, next) => {
  req.user = {
    _id: '672ab6ad57abcacafd8186bd', // usuario prueba
  };

  next();
});
*/

app.post('/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login);

app.post('/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().optional(),
      about: Joi.string().optional(),
      avatar: Joi.string().optional(),
    }),
  }),
  createUser);

app.use(auth);

app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use('/', notFoundRouter);

app.use(errorLogger);
app.use(errors());

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});

app.use((err, req, res, next) => {
  // si un error no tiene estado, se muestra 500
   const { statusCode = 500, message } = err;
   res
     .status(statusCode)
     .send({
      // comprueba el estado y muestra un mensaje basado en dicho estado
       message: statusCode === 500
         ? 'Se ha producido un error en el servidor'
         : message
     });
 });
