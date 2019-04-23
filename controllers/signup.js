import { encrypt } from '../modules';
import {
  USER_ALREADY_EXISTS,
  PHONENUMBER_OR_PASSWORD_MISSING
} from '../errorMessages';
import db from '../models';

const signup = async (req, res) => {
  const { phone, username } = req.body;
  const password = encrypt(req.body.password);

  if (!phone || !password) {
    throw new Error(PHONENUMBER_OR_PASSWORD_MISSING);
  }

  try {
    let customer = await db.customer.findOne({
      where: { phone: phone }
    });

    if (customer) {
      throw new Error(USER_ALREADY_EXISTS);
    }

    await db.customer.create({
      name: username,
      password: password,
      phone: phone
    });
    res.status(201).send('user added!');
  } catch (err) {
    if (err.message === USER_ALREADY_EXISTS) {
      res.status(400).send(err.message);
    } else if (err.message === PHONENUMBER_OR_PASSWORD_MISSING) {
      res.status(400).send(err.message);
    } else {
      res.status(500).send(err.message);
    }
  }
};

export default signup;
