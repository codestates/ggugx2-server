import db from '../models';
import { Op } from 'sequelize';

const getStampsRewardsCounts = async (req, res) => {
  const { customerID, storeID } = req.body;

  try {
    let stampsData = await db.stamps.findAll({
      where: {
        [Op.and]: [{ CUSTOMER_ID: customerID }, { STORE_ID: storeID }]
      }
    });

    let rewardsData = await db.rewards.findAll({
      where: {
        [Op.and]: [{ CUSTOMER_ID: customerID }, { USED_DATE: null }]
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
