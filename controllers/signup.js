import fs from 'fs';
import _ from 'lodash';
import { encrypt } from '../modules';
import { promisify } from 'util';

const USER_ALREADY_EXISTS = 'user already exists!';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const signup = async (req, res) => {
  const username = req.body.username;
  const password = encrypt(req.body.password);

  if (!username || !password) {
    return res
      .status(400)
      .send('BAD request! username or password is missing!');
  }

  let userRequested = {
    username: username,
    password: password
  };

  try {
    const data = await readFile('userInfo.json', 'utf8');
    const users = JSON.parse(data);
    let user = _.find(users, { username: username });
    if (user) {
      throw new Error(USER_ALREADY_EXISTS);
    }

    users.push(userRequested);
    await writeFile('userInfo.json', JSON.stringify(users));

    res.status(201).send('user added!');
  } catch (err) {
    if (err.message === USER_ALREADY_EXISTS) {
      res.status(400).send(USER_ALREADY_EXISTS);
    } else {
      res.status(500).send(err.message);
    }
  }
};

export default signup;
