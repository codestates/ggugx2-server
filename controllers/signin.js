import jwt from 'jsonwebtoken';
import { secret, expireTime } from '../config';
import { encrypt } from '../modules';
import {
  USERNAME_OR_PASSWORD_MISSING,
  WRONG_PASSWORD,
  USER_NOT_EXISTS
} from '../errorMessages';
import db from '../models';

const signin = async (req, res) => {
  const username = req.body.username;
  const password = encrypt(req.body.password);

  if (!username || !password) {
    throw new Error(USERNAME_OR_PASSWORD_MISSING);
  }

  try {
    let { dataValues } = await db.customers.findOne({
      where: { name: username }
    });
    let user = dataValues;

    if (!user) {
      throw new Error(USER_NOT_EXISTS);
    }

    if (password === user.PASSWORD) {
      let token = jwt.sign({ username: username }, secret, {
        expiresIn: expireTime
      });

      res.status(200).json({
        success: true,
        message: 'Authentication successful!!!',
        token: token
      });
    } else {
      throw new Error(WRONG_PASSWORD);
    }
  } catch (err) {
    if (err.message === USERNAME_OR_PASSWORD_MISSING) {
      res.status(400).send(err.message);
    } else if (USER_NOT_EXISTS) {
      res.status(400).send(err.message);
    } else if (WRONG_PASSWORD) {
      res.status(400).send(err.message);
    } else {
      res.status(500).send(err.message);
    }
  }
};

export default signin;
