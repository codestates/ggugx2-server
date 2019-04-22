import express from 'express';
import bodyParser from 'body-parser';
import {
  stores,
  customers,
  tests,
  getStampsRewardsCounts,
  stamps
} from './routes';
import { socketioHandler } from './controllers';
import cors from 'cors';
import socketIO from 'socket.io';
import http from 'http';

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const io = socketIO(server);

io.on('connection', socketioHandler);

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
app.use(getStampsRewardsCounts);
app.use(stamps);

app.set('port', port);

module.exports = app;
server.listen(app.get('port'), () => {
  console.log('now listening on port ', app.get('port'));
});
