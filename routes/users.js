const express = require('express');
const saveUserInfo = require('../controllers/saveUserInfo');

const app = express.Router();

app.post('/users/signup', (req, res) => {
  console.log('reached at signup!!! body: ', req.body);
  saveUserInfo(req, res);
});

app.post('/users/signin', (req, res) => {
  console.log('reached at signin!!! body: ', req.body);
  res.end('SUCESS!!!');
});

module.exports = app;
