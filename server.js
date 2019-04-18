import express from 'express';
import bodyParser from 'body-parser';
import { customers, tests } from './routes';
import cors from 'cors';
import { checkToken } from './middlewares';
import session from 'express-session';
import jwt from 'jsonwebtoken';
import { secret } from './config';

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
/**
 * session(option)
 * secret - session hijacking을 막기위해 hash값에 추가로 들어가는 값 (Salt와 비슷한 개념)
 * resave - session을 언제나 저장할지 정하는 값
 * saveUninitialize: true - 세션이 저장되기 전에 uninitialized 상태로 만들어 저장
 * cookie/ secure - default는 true로 https상에서 통신할 때 정상적으로
 *  */
app.use(
  session({
    secret: '@a4f8071f-sssmo880-=!!@12',
    resave: false,
    saveUninitialized: true
  })
);

app.set('port', port);
app.listen(app.get('port'));

//TODO: signup 할때 null 나오면 에러를 어떻게 처리를 해야되는지 고민해보기.
app.post('/customers/singup', checkToken, (req, res) => {
  const { phone, username, password } = req.body;

  customers
    .create({
      phone: phone,
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
  const { phone, password, ID } = req.body;

  customers
    .findOne({
      where: { phone: phone, password: password, customerID: ID }
    })
    .then(result => {
      var check = result.dataValues;
      var sess = req.sess;

      if (check.phone === phone && check.passworkd === password) {
        let token = jwt.sign({ phone: phone }, secret, {
          expiresIn: expireTime
        });
        sess.id = username;
        sess.issignON = true;
      }
      res
        .status(200)
        .json({ sucess: true, token: token, customerID: sess.id })
        .end('OK');
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500); // server error
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
