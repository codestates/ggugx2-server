import jwt from 'jsonwebtoken';
import { encrypt } from '../modules';
import {
  PHONENUMBER_OR_PASSWORD_MISSING,
  WRONG_PASSWORD,
  USER_NOT_EXISTS
} from '../errorMessages';
import db from '../models';
import { secret, expireTime } from '../config';

const signin = async (req, res) => {
  const phone = req.body.phone;
  const password = encrypt(req.body.password);

  if (!phone || !password) {
    throw new Error(PHONENUMBER_OR_PASSWORD_MISSING);
  }

  try {
    let result = await db.customers.findOne({
      where: { phone: phone }
    });

    if (!result) {
      throw new Error(USER_NOT_EXISTS);
    }
    let { dataValues } = result;
    let customer = dataValues;

    if (password === customer.PASSWORD) {
      let token = jwt.sign({ phone: phone }, secret, {
        expiresIn: expireTime
      });
      //TODO: customerID 받아오기
      res.status(200).json({
        success: true,
        token: token,
        customerID: customer.id
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
