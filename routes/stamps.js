import express from 'express';
import { toss } from '../controllers';
import { checkToken } from '../middlewares';

const app = express.Router();

app.post('/stamps/toss', checkToken, (req, res) => {
  console.log('Now you are at stamps/toss!!! body: ', req.body);
  toss(req, res);
});

export default app;
