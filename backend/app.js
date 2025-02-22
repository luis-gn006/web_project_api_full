const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const notFoundRouter = require('./routes/notFound');
const {login, createUser} = require('./controllers/users')

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

app.use((req, res, next) => {
  req.user = {
    _id: '672ab6ad57abcacafd8186bd', // usuario prueba
  };

  next();
});

app.post('/signin', login);
app.post('/signup', createUser);

app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use('/', notFoundRouter);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
