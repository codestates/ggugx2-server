import express from 'express';
import bodyParser from 'body-parser';
import { customers, tests } from './routes';
import cors from 'cors';
import socketIO from 'socket.io';
import http from 'http';

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const io = socketIO(server);

const registeredSockets = {};
io.on('connection', socket => {
  console.log('a socket connected!');
  socket.on('register', msg => {
    registeredSockets[msg.id] = socket;
    socket.id = msg.id;
    console.log(`${socket.id} has been registered!`);
  });

  socket.on('private', msg => {
    console.log(
      `[private] ${socket.id} send a message to ${msg.to}: ${msg.message}`
    );
    registeredSockets[msg.to].emit('private', {
      from: socket.id,
      message: msg.message
    });
    socket.emit('private', { from: socket.id, message: msg.message });
  });

  socket.on('public chat', msg => {
    console.log(`[public chat] message from ${socket.id}: ${msg}`);
    io.emit('public chat', { id: socket.id, message: msg });
  });
});

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

app.post('/stores/signupStores', (req, res) => {
  const {
    phone,
    storename,
    password,
    address,
    openhour,
    closehour,
    stamp,
    dayoff
  } = req.body;
  stores
    .create({
      phone: phone,
      storename: storename,
      password: password,
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

app.post('/stores/signinStores', checkToken, (req, res) => {
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
server.listen(app.get('port'), () => {
  console.log('now listening on port ', app.get('port'));
});
