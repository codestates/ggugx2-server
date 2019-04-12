const express = require('express');
const signup = require('../controllers/signup');

const app = express.Router();

app.post('/users/signup', (req, res) => {
  console.log('reached at signup!!! body: ', req.body);
  signup(req, res);
});

app.post('/users/signin', (req, res) => {
  console.log('reached at signin!!! body: ', req.body);
  res.end('SUCESS!!!');
});

module.exports = app;
