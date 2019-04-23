import db from '../models';
import { Op } from 'sequelize';

const getStampsRewardsCounts = async (req, res) => {
  const { customerID, storeID } = req.body;

  try {
    let stampsData = await db.stamps.findAll({
      where: {
        [Op.and]: [{ customerId: customerID }, { storeId: storeID }]
      }
    });

    let rewardsData = await db.rewards.findAll({
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
