import express from 'express';
import { signin, signup, exchange } from '../controllers';
import { checkToken } from '../middlewares';

const app = express.Router();

app.post('/customers/signup', (req, res) => {
  console.log('reached at signup!!! body: ', req.body);
  signup(req, res);
});

app.post('/customers/signin', (req, res) => {
  console.log('reached at signin!!! body: ', req.body);
  signin(req, res);
});

app.post('/customers/exchange', checkToken, (req, res) => {
  console.log('reached at exchange!!! body: ', req.body);
  exchange(req, res);
});

export default app;
