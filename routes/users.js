import express from 'express';
import { signin, signup } from '../controllers';

const app = express.Router();

app.post('/users/signup', (req, res) => {
  console.log('reached at signup!!! body: ', req.body);
  signup(req, res);
});

app.post('/stores/signup', (req, res) => {
  console.log('reached at stores signup!!! body: ', req.body);
  signup(req, res);
});

app.post('/users/signin', (req, res) => {
  console.log('reached at signin!!! body: ', req.body);
  signin(req, res);
});

export default app;
