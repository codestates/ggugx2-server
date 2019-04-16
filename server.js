import express from 'express';
import bodyParser from 'body-parser';
import { users, stores, tests } from './routes';

const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  console.log('request reached at /');
  res.status(200).send('SUCCESS!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(users);
app.use(tests);

app.set('port', port);
app.listen(app.get('port'));

//cors() - CORS를 대응하기 위한 라이브러리?
app.use(
  cors({
    origin: ['http://localhost:3000'],
    method: ['GET', 'POST'],
    credentials: true
  })
);

app.get('/', (req, res) => {
  res.status(200).send('Success');
});

app.post('/users/singup', (req, res) => {
  const { username, password } = req.body;
  users
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

app.post('/users/signin', (req, res) => {
  // Search for a specific element or create it if not available
  return Customers.findOrCreate({
    where: {
      username: customers.username
    },
    defaults: {
      username: customers.username
    }
  });
});

app.post('/stores/signup', (req, res) => {
  const {
    name,
    password,
    phone,
    address,
    openhour,
    closehour,
    stamp,
    dayoff
  } = req.body;
  stores
    .create({
      name: name,
      password: password,
      phone: phone,
      address: address,
      openhour: openhour,
      closehour: closehour,
      stamp: stamp,
      dayoff: dayoff
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

module.exports = app;
