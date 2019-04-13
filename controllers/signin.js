import fs from 'fs';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import { secret, expireTime } from '../config';
import { encrypt } from '../modules';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);

const signin = async (req, res) => {
  const username = req.body.username;
  const password = encrypt(req.body.password);

  if (!username || !password) {
    return res
      .status(400)
      .send('BAD request! username or password is missing!');
  }

  try {
    const content = await readFile('userInfo.json', 'utf8');
    const users = JSON.parse(content);
    let user = _.find(users, { username: username });

    if (user && username === user.username && password === user.password) {
      let token = jwt.sign({ username: username }, secret, {
        expiresIn: expireTime
      });

      res.status(200).json({
        success: true,
        message: 'Authentication successful!!!',
        token: token
      });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default signin;
