import db from '../models';
const Op = db.Sequelize.Op;

const getStampsRewardsCounts = async (req, res) => {
  const { customerID, storeID } = req.body;

  try {
    let stampsData = await db.stamp.findAll({
      where: {
        [Op.and]: [{ customerId: customerID }, { storeId: storeID }]
      }
    });

    let rewardsData = await db.reward.findAll({
      where: {
        [Op.and]: [{ customerId: customerID }, { usedDate: null }]
      }
    });

    res.status(200).json({
      stamps: stampsData.length,
      rewards: rewardsData.length
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default getStampsRewardsCounts;
