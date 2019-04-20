import db from '../models';
import { COUPON_NOT_EXITS, REWARD_NOT_EXITS } from '../errorMessages';

const Op = db.Sequelize.Op;

const getStampsRewardsCounts = async (req, res) => {
  const { customerID, storeID } = req.body;

  try {
    let stampsData = await db.stamps
      .findAll({
        where: {
          [Op.and]: [
            { CUSTOMER_ID: customerID },
            { STORE_ID: storeID },
            { EXCHANGED_DATE: null }
          ]
        }
      })
      .map(item => item.dataValues);

    let rewardsData = await db.rewards
      .findAll({
        where: {
          [Op.and]: [{ CUSTOMER_ID: customerID }, { USED_DATE: null }]
        }
      })
      .map(item => item.dataValues);

    if (stampsData && rewardsData) {
      console.log('search result for stamps: ', stampsData.length);
      console.log('search result for reward: ', rewardsData.length);

      res.status(200).json({
        stamps: stampsData.length,
        rewards: rewardsData.length
      });
    } else {
      res.status(400).json({
        message: { COUPON_NOT_EXITS, REWARD_NOT_EXITS }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500);
  }
};

export default getStampsRewardsCounts;
