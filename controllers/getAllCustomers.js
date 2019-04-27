import db from '../models';
const Op = db.Sequelize.Op;

//'/customer/getAll'

const getAllCustomers = async (req, res) => {
  if (req.body.phone) {
    const { phone } = req.body;
    try {
      let phoneList = await db.customer.findAll({
        where: {
          phone: {
            [Op.like]: `%${phone}`
          }
        },
        attributes: ['id', 'name', 'phone']
      });
      res.status(200).json(phoneList);
    } catch (err) {
      res.status(500).send(err.message);
    }
  } else {
    try {
      let customersData = await db.customer.findAll({
        attributes: ['id', 'name', 'phone']
      });
      res.status(200).json(customersData);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
};

export default getAllCustomers;
