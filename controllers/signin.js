import jwt from 'jsonwebtoken';
import { secret, expireTime } from '../config';
import { encrypt, getUser } from '../modules';
import { USERNAME_OR_PASSWORD_MISSING } from '../errorMessages';

const signin = async (req, res) => {
  const username = req.body.username;
  const password = encrypt(req.body.password);

  if (!username || !password) {
    throw new Error(USERNAME_OR_PASSWORD_MISSING);
  }

  try {
    let user = await getUser(username);

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
    if (err.message === USERNAME_OR_PASSWORD_MISSING) {
      res.status(400).send(USERNAME_OR_PASSWORD_MISSING);
    } else {
      res.status(500).send(err.message);
    }
  }
};

export default signin;
