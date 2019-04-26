import db from '../models';
console.log(db.customer);
//'/customer/getAll'
const getAllCustomers = async (req, res) => {
  try {
    let customersData = await db.customer.findAll({
      attributes: ['id', 'name', 'phone']
    });
    res.status(200).json(customersData);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default getAllCustomers;
