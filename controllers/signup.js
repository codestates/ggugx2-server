import { encrypt } from '../modules';
import {
  USER_ALREADY_EXISTS,
  PHONENUMBER_OR_PASSWORD_MISSING,
  USERNAME_IS_NULL,
  PASSWORD_IS_NULL
} from '../errorMessages';
import db from '../models';

const signup = async (req, res) => {
  const { phone, username } = req.body;
  const password = encrypt(req.body.password);

  console.log(req.body);
  //change to res.status(400) instead throwing new Error
  if (!phone || !password) {
    res.status(400).send(PHONENUMBER_OR_PASSWORD_MISSING);
  } else if (username === null) {
    res.status(400).send(USERNAME_IS_NULL);
  } else if (password === null) {
    res.status(400).send(PASSWORD_IS_NULL);
  }

  try {
    let customer = await db.customer.findOne({
      where: { phone: phone }
    });

    if (customer) {
      await db.customer.findOne({
        where: { name: null || '' }
      });
      res.status(400).send(USERNAME_IS_NULL);
      await db.customer.findOne({
        where: { passowrd: null || '' }
      });
      res.status(400).send(PASSWORD_IS_NULL);
    } else {
      // if (customer) {
      //   throw new Error(USER_ALREADY_EXISTS);
      // }

      await db.customer.update(
        {
          name: username,
          password: password
        },
        { where: { phone: phone } }
      );
    }

    await db.customer.create({
      name: username,
      password: password,
      phone: phone
    });
    res.status(201).send('user added!');
  } catch (err) {
    // if (err.message === USER_ALREADY_EXISTS) {
    //   res.status(400).send(err.message);
    // } else if (err.message === PHONENUMBER_OR_PASSWORD_MISSING) {
    //   res.status(400).send(err.message);
    // } else {
    // }
    res.status(500).send(err.message);
  }
};

export default signup;
