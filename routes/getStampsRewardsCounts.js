import express from 'express';
import { getStampsRewardsCounts } from '../controllers';

const app = express.Router();

app.post('/customers/get-stamps-rewards-counts', (req, res) => {
  console.log('Now you are at counting page!!! body: ', req.body);
  getStampsRewardsCounts(req, res);
});

export default app;
