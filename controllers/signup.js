import { encrypt } from '../modules';
import {
  PHONENUMBER_OR_PASSWORD_MISSING,
  USERNAME_IS_NULL,
  PASSWORD_IS_NULL,
  USER_ALREADY_EXISTS
} from '../errorMessages';
import db from '../models';
const Op = db.Sequelize.Op;

const signup = async (req, res) => {
  const { phone, username } = req.body;
  const password = encrypt(req.body.password);

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

    if (customer && customer.name === null && customer.password === null) {
      await db.customer.update(
        {
          name: username,
          password: password
        },
        { where: { phone: phone } }
      );
      res.status(201).send('name and password are now update');
    } else if (customer) {
      throw new Error(USER_ALREADY_EXISTS);
    } else {
      await db.customer.create({
        name: username,
        password: password,
        phone: phone
      });
      res.status(201).send('created new user!');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default signup;
