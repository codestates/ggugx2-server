const express = require('express');
const checkToken = require('../modules/checkToken');
const app = express.Router();

app.get('/tests', checkToken, (req, res) => {
  console.log('reached at test!!! body: ', req.body);
  res.json({
    success: true,
    message: 'Token valid'
  });
});

module.exports = app;
