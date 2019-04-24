import express from 'express';
import {
  signin,
  signup,
  exchange,
  doesCustomerExist,
  getAllCustomers
} from '../controllers';
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

app.post('/customers/exist', checkToken, (req, res) => {
  console.log('reached at exist!!! body: ', req.body);
  doesCustomerExist(req, res);
});

// TODO: move the following api to under /stamps
app.post('/customers/exchange', checkToken, (req, res) => {
  console.log('reached at exchange!!! body: ', req.body);
  exchange(req, res);
});

//[웹 api]유천호 추가
app.get('/customers/getAll', (req, res) => {
  console.log('you get all customers information!!! body:', req.body);
  getAllCustomers(req, res);
});

export default app;
