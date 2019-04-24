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
    await db.stamps.create({
      CUSTOMER_ID: customerID,
      STORE_ID: storeID
    });

    let result = await db.stamps.findAll({
      where: {
        [Op.and]: [{ CUSTOMER_ID: customerID }, { STORE_ID: storeID }]
      }
    });

    res.status(200).json({ result: result });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
export default stampsAdd;
