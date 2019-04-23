import db from '../models';
const Op = db.Sequelize.Op;

const toss = async (req, res) => {
  const store = req.body.store;
  const prevOwner = req.body.from;
  const newOwner = req.body.to;
  const numOfStamps = req.body.stamps;

  try {
    // await db.stamps.bulkCreate(...newStampsData);
    await db.stamp.update(
      { customerId: newOwner },
      {
        order: ['createdAt', 'DESC'],
        limit: numOfStamps,
        where: {
          [Op.and]: [
            { customerId: prevOwner },
            { storeId: store },
            { exchangedDate: null }
          ]
        }
      }
    );

    let stampsAfterToss = await db.stamp.findAll({
      where: {
        [Op.and]: [
          { customerId: prevOwner },
          { storeId: store },
          { exchangedDate: null }
        ]
      }
    });

    res.status(200).json({ stamps: stampsAfterToss.length });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default toss;
