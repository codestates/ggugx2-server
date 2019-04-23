import db from '../models';
import { USER_NOT_EXISTS } from '../errorMessages';

const doesCustomerExist = async (req, res) => {
  const phone = req.body.phone;
  try {
    const searchResult = await db.customers.findOne({
      where: { phone: phone }
    });

    if (!searchResult) {
      throw new Error(USER_NOT_EXISTS);
    }

    const customer = searchResult.dataValues;

    console.log('customer found: ', customer);
    res.status(200).json({ id: customer.id, name: customer.NAME });
  } catch (err) {
    if (err.message === USER_NOT_EXISTS) {
      res.status(400).send(err.message);
    } else {
      res.status(500).send(err.message);
    }
  }
};

export default doesCustomerExist;
