import { encrypt } from '../modules';
import {
  STORE_ALREADY_EXITS,
  BLANKS_MISSING,
  PHONENUMBER_OR_PASSWORD_MISSING
} from '../errorMessages';
import db from '../models';

const signupStores = async (req, res) => {
  const phone = req.body.phone;
  const storename = req.body.storename;
  const password = encrypt(req.body.password);
  const address = req.body.address;
  const openhour = req.body.openhour;
  const closehour = req.body.closehour;
  const stamp = req.body.stamp;
  const dayoff = req.body.dayoff;

  if (!phone || !password) {
    throw new Error(PHONENUMBER_OR_PASSWORD_MISSING);
  }

  try {
    let store = await db.stores.findOne({
      where: { phone: phone }
    });

    if (store) {
      throw new Error(STORE_ALREADY_EXITS);
    }

    await db.stores.create({
      NAME: storename,
      PASSWORD: password,
      PHONE: phone,
      ADDRESS: address,
      OPENHOUR: openhour,
      CLOSEHOUR: closehour,
      STAMP: stamp,
      DAYOFF: dayoff
    });
    res.status(201).send('stores added!');
  } catch (err) {
    if (err.message === STORE_ALREADY_EXITS) {
      res.status(400).send(err.message);
    } else if (err.message === BLANKS_MISSING) {
      res.status(400).send(err.message);
    } else {
      res.status(500).send(err.message);
    }
  }
};

export default signupStores;
