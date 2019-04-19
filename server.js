import express from 'express';
import bodyParser from 'body-parser';
import { stores, customers, tests } from './routes';
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
app.use(cors());

app.use(customers);
app.use(tests);
app.use(stores);

app.set('port', port);
app.listen(app.get('port'));

module.exports = app;
server.listen(app.get('port'), () => {
  console.log('now listening on port ', app.get('port'));
});
