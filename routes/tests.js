import express from 'express';
import { checkToken } from '../middlewares';
import { encrypt, decrypt } from '../modules';

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

export default app;
