import db from '../models';
const Op = db.Sequelize.Op;

const getStampsRewardsCounts = async (req, res) => {
  const { customerID, storeID } = req.body;

  try {
    let stampsData = await db.stamp
      .findAll({
        where: {
          [Op.and]: [
            { customerId: customerID },
            { storeId: storeID },
            { exchangedDate: null }
          ]
        }
      })
      .map(item => item.dataValues);

    let menusData = await db.menu
      .findAll({
        where: { storeId: storeID }
      })
      .map(item => item.dataValues);

    await db.reward.findAll({
      where: {
        [Op.and]: [
          { menuId: menusData[0].id },
          { customerId: customerID },
          { usedDate: null }
        ]
      },
      order: [['createdAt', 'DESC']]
    });

    let rewardData = await db.reward
      .findAll({
        where: {
          [Op.and]: [
            { menuId: menusData[0].id },
            { customerId: customerID },
            { usedDate: null }
          ]
        }
      })
      .map(item => item.dataValues);

    res.status(200).json({
      stamps: stampsData.length,
      rewards: rewardData.length
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default getStampsRewardsCounts;
