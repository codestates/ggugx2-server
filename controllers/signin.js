import jwt from 'jsonwebtoken';
import { secret, expireTime } from '../config';
import { encrypt } from '../modules';
import {
  PHONENUMBER_OR_PASSWORD_MISSING,
  WRONG_PASSWORD,
  USER_NOT_EXISTS
} from '../errorMessages';
import db from '../models';

const signin = async (req, res) => {
  const username = req.body.username;
  const phone = req.body.phone;
  const password = encrypt(req.body.password);

  if (!phone || !password) {
    throw new Error(PHONENUMBER_OR_PASSWORD_MISSING);
  }

  try {
    let { dataValues } = await db.customers.findOne({
      where: { phone: phone }
    });
    let customer = dataValues;

    if (!customer) {
      throw new Error(USER_NOT_EXISTS);
    }

    if (password === customer.PASSWORD) {
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
    if (err.message === PHONENUMBER_OR_PASSWORD_MISSING) {
      res.status(400).send(err.message);
    } else if (err.message === USER_NOT_EXISTS) {
      res.status(400).send(err.message);
    } else if (err.message === WRONG_PASSWORD) {
      res.status(400).send(err.message);
    } else {
      res.status(500).send(err.message);
    }
  }
};

export default signin;
