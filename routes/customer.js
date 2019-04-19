import express from 'express';
import { signin, signup } from '../controllers';

const app = express.Router();

app.post('/customers/signup', (req, res) => {
  console.log('reached at signup!!! body: ', req.body);
  signup(req, res);
});

app.post('/customers/signin', (req, res) => {
  console.log('reached at signin!!! body: ', req.body);
  signin(req, res);
});

export default app;
