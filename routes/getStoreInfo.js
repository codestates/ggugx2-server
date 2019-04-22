import express from 'express';
import { getStoreInfo } from '../controllers';

const app = express.Router();

app.post('/customers/get-store-info', (req, res) => {
  console.log('Now you are at getStoreInfo page!!! body: ', req.body);
  getStoreInfo(req, res);
});

export default app;
