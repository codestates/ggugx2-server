import express from 'express';
import bodyParser from 'body-parser';
import { users, tests } from './routes';
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

  socket.on('stamp add', msg => {
    console.log(`[stamp add] ${socket.id} send a request to ${msg.store}`);
    socket.emit('stamp complete', {
      customer: socket.id,
      store: msg.store,
      success: true
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
app.use(cors());

app.use(users);
app.use(tests);

app.set('port', port);
server.listen(app.get('port'), () => {
  console.log('now listening on port ', app.get('port'));
});
