import express from 'express';
import bodyParser from 'body-parser';
import { users, tests } from './routes';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  console.log('request reached at /');
  res.status(200).send('SUCCESS!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ['http://localhost:3000'],
    method: ['GET', 'POST'],
    credentials: true
  })
);

app.use(customers);
app.use(tests);

app.set('port', port);
app.listen(app.get('port'));

//TODO: signup 할때 null 나오면 에러를 어떻게 처리를 해야되는지 고민해보기.
app.post('/customers/singup', (req, res) => {
  const { username, password } = req.body;

  customers
    .create({
      username: username,
      password: password
    })
    .then(result => {
      res
        .status(200)
        .json(result)
        .end('OK');
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(400);
    });
});

app.post('/customers/signin', checkToken, (req, res) => {
  // Search for a specific element or create it if not available
  const { username, password } = req.body;

  customers
    .findOne({
      where: { username: username, password: password }
    })
    .then(result => {
      res
        .status(200)
        .json(result)
        .end('로그인 성공');
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(400);
    });
});

app.post('/stores/signup', (req, res) => {
  const {
    username,
    // phone,
    // address,
    // openhour,
    // closehour,
    // stamp,
    // dayoff,
    password
  } = req.body;
  stores
    .create({
      username: username,
      // phone: phone,
      // address: address,
      // openhour: openhour,
      // closehour: closehour,
      // stamp: stamp,
      // dayoff: dayoff,
      password: password
    })
    .then(result => {
      res
        .status(200)
        .json(result)
        .end('OK');
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    });
});

app.post('/stores/signin', checkToken, (req, res) => {
  const {
    username,
    phone,
    address,
    openhour,
    closehour,
    stamp,
    dayoff,
    password
  } = req.body;
  stores
    .findOne({
      where: { username: username, password: password }
    })
    .then(result => {
      res
        .status(200)
        .json(result)
        .end('Welcome back!');
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    });
});

module.exports = app;
