import db from '../models';

const Op = db.Sequelize.Op;

const stampsAdd = async (req, res) => {
  const { customerID, storeID } = req.body;

  if (!customerID || !storeID) {
    res
      .status(400)
      .send('customerID or storeID is missing, check again please');
  }

  try {
    let customer = await db.customer.findByPk(customerID);
    let store = await db.store.findByPk(storeID);

    let newStamp = await db.stamp.create({});
    newStamp.setCustomer(customer);
    newStamp.setStore(store);

    let result = await db.stamp.findAll({
      where: {
        [Op.and]: [
          { customerId: customerID },
          { storeId: storeID },
          { exchangedDate: null }
        ]
      }
    });

    res.status(200).json({ result: result.length });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
export default stampsAdd;
