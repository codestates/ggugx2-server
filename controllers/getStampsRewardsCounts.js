import db from '../models';

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

    let menusData = await db.menus
      .findAll({
        where: { STORE_ID: storeID }
      })
      .map(item => item.dataValues);

    await db.rewards.findAll({
      where: {
        [Op.and]: [
          { MENU_ID: menusData[0].id },
          { CUSTOMER_ID: customerID },
          { USED_DATE: null }
        ]
      },
      order: [['createdAt', 'DESC']]
    });

    let rewardsData = await db.rewards
      .findAll({
        where: {
          [Op.and]: [
            { MENU_ID: menusData[0].id },
            { CUSTOMER_ID: customerID },
            { USED_DATE: null }
          ]
        }
      })
      .map(item => item.dataValues);

    res.status(200).json({
      stamps: stampsData.length,
      rewards: rewardsData.length
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default getStampsRewardsCounts;
