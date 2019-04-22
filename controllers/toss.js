import db from '../models';
const Op = db.Sequelize.Op;

const toss = async (req, res) => {
  const store = req.body.store;
  const prevOwner = req.body.from;
  const newOwner = req.body.to;
  const numOfStamps = req.body.stamps;

  try {
    // await db.stamps.bulkCreate(...newStampsData);
    await db.stamps.update(
      { CUSTOMER_ID: newOwner },
      {
        order: ['createdAt', 'DESC'],
        limit: numOfStamps,
        where: {
          [Op.and]: [
            { CUSTOMER_ID: prevOwner },
            { STORE_ID: store },
            { EXCHANGED_DATE: null }
          ]
        }
      }
    );

    let stampsAfterToss = await db.stamps.findAll({
      where: {
        [Op.and]: [
          { CUSTOMER_ID: prevOwner },
          { STORE_ID: store },
          { EXCHANGED_DATE: null }
        ]
      }
    });

    res.status(200).json({ stamps: stampsAfterToss.length });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default toss;
