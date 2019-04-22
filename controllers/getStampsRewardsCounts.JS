import db from '../models';

const Op = db.Sequelize.Op;

const getStampsRewardsCounts = async (req, res) => {
  const customerID = req.body.customerID;
  const storeID = req.body.storeID;

  try {
    let stampsData = await db.stamps.findAll({
      where: {
        [Op.and]: [{ CUSTOMER_ID: customerID }, { STORE_ID: storeID }]
      }
    });

    if (stampsData.length === 0) {
      console.log('sorry you have no stamps rigth now!');
    }

    let rewardsData = await db.rewards.findAll({
      where: {
        [Op.and]: [{ CUSTOMER_ID: customerID }, { USED_DATE: null }]
      }
    });

    if (stampsData.length || rewardsData.length) {
      res.status(200).json({
        stamps: stampsData.length,
        rewards: rewardsData.length
      });
    } else {
      res.status(400).json({
        stamps: 'sorry you have 0 stamp',
        rewards: 'sorry you have 0 reward'
      });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default getStampsRewardsCounts;
