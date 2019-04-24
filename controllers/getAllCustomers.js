import db from '../models';

const getAllCustomers = async (req, res) => {
  try {
    let customersData = await db.customers.findAll({
      attributes: ['id', 'NAME', 'PHONE']
    });
    res.status(200).json(customersData);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default getAllCustomers;
