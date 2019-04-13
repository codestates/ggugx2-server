const express = require('express');
const checkToken = require('../modules/checkToken');
const { encrypt, decrypt } = require('../modules/cryptoPassword');

const app = express.Router();

app.get('/tests', checkToken, (req, res) => {
  console.log('reached at test!!! body: ', req.body);
  res.json({
    success: true,
    message: 'Token valid'
  });
});

app.post('/tests/encrypt', (req, res) => {
  console.log('reached at encrypt test!!! body: ', req.body);
  res.send(encrypt(req.body.text));
});

app.post('/tests/decrypt', (req, res) => {
  console.log('reached at encrypt test!!! body: ', req.body);
  res.send(decrypt(req.body.text));
});

module.exports = app;
