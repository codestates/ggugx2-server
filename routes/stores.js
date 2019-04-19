import express from 'express';
import { signinStores, signupStores } from '../controllers';

const app = express.Router();

app.post('/stores/signup', (req, res) => {
  console.log('Now you are at signup!!! body: ', req.body);
  signupStores(req, res);
});

app.post('/stores/signin', (req, res) => {
  console.log('Now you are at signin!!! body: ', req.body);
  signinStores(req, res);
});

export default app;
