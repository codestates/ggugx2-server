import express from 'express';
import bodyParser from 'body-parser';
import { users, tests } from './routes';

const app = express();
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
