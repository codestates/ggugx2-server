import jwt from 'jsonwebtoken';
import { encrypt } from '../modules';
import {
  PHONENUMBER_OR_PASSWORD_MISSING,
  WRONG_PASSWORD,
  STORE_NOT_EXISTS
} from '../errorMessages';
import db from '../models';
import { secret, expireTime } from '../config';

const signinStores = async (req, res) => {
  const phone = req.body.phone;
  const password = encrypt(req.body.password);

  if (!phone || !password) {
    throw new Error(PHONENUMBER_OR_PASSWORD_MISSING);
  }

  try {
    let result = await db.store.findOne({
      where: { phone: phone }
    });

    if (!result) {
      throw new Error(STORE_NOT_EXISTS);
    }
    //좀 더 편리한 방법
    let { dataValues: store } = result;
    // let store = dataValues;

    if (password === store.password) {
      let token = jwt.sign({ phone: phone }, secret, {
        expiresIn: expireTime
      });

      res.status(200).json({
        success: true,
        token: token,
        storeid: store.id
      });
    } else {
      throw new Error(WRONG_PASSWORD);
    }
  } catch (err) {
    if (err.message === PHONENUMBER_OR_PASSWORD_MISSING) {
      res.status(400).send(err.message);
    } else if (err.message === STORE_NOT_EXISTS) {
      res.status(400).send(err.message);
    } else {
      res.status(500).send(err.message);
    }
  }
};

export default signinStores;
