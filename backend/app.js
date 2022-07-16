const express = require('express');
const middlewareError = require('../middlewares/middlewareError');


const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const app = express();
const port = 3000;

const {usersRouter} = require('./routes/users');
const {cardsRouter} = require('./routes/cards');

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Origin',
    'https://api.bogush.students.nomoredomainssbs.ru'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  next();
});

app.use('/', usersRouter);
app.use('/', cardsRouter);

app.use('*', (req, res, next) => next(new middlewareError('Requested resource not found', NOT_FOUND)));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
