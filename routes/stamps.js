import express from 'express';
import { toss, stampsAdd } from '../controllers';
import { checkToken } from '../middlewares';

const app = express.Router();

app.post('/stamps/toss', checkToken, (req, res) => {
  console.log('Now you are at stamps/toss!!! body: ', req.body);
  toss(req, res);
});

app.post('/stamps/add', (req, res) => {
  console.log('plz add Stamps! body: ', req.body);
  stampsAdd(req, res);
});

export default app;
