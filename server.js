import express from 'express';
import bodyParser from 'body-parser';
import { users, tests } from './routes';
import cors from 'cors';
// import socketIO from 'socket.io';
import http from 'http';

const app = express();
const server = http.createServer(app);
// const io = socketIO(server);
const port = process.env.PORT || 3000;

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
// app.listen(app.get('port'));
server.listen(app.get('port'));
