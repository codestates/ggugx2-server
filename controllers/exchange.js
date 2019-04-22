import db from '../models';
const Op = db.Sequelize.Op;
// TODO: should get the value from database
const EXCHANGE_RATE = 10;

const exchange = async (req, res) => {
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

    // TODO: MENU_ID should not be a constant!!!
    if (stampsData.length >= EXCHANGE_RATE) {
      await db.rewards.create({
        MENU_ID: 1,
        CUSTOMER_ID: customerID
      });

      await db.stamps.update(
        { EXCHANGED_DATE: db.Sequelize.fn('NOW') },
        {
          order: ['createdAt', 'DESC'],
          limit: EXCHANGE_RATE,
          where: {
            [Op.and]: [
              { CUSTOMER_ID: customerID },
              { STORE_ID: storeID },
              { EXCHANGED_DATE: null }
            ]
          }
        }
      );

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

      console.log('search result: ', stampsData);
      res.status(200).json({
        stamps: stampsData.length,
        rewards: rewardsData.length
      });
    } else {
      res.status(400).json({
        message: "you don't have enough stamps",
        numOfStamps: stampsData.length
      });
    }
    // 10개인지 확인하고, 10개가 넘으면,
    // reward를 하나 생성하고, 문제가 없으면,
    // 찾았던 stamp 들의 id를 참조해서 EXCHANGE_DATE를 지금으로 업데이트 한다.
    // 모두 정상적으로 끝나면, 성공 메시지에 stamp 갯수와 reward 갯수를 실어보낸다.
    // * 이슈: 사용 날짜 업데이트 할 때, 갯수 세어서 업데이트 하도록 해야한다.
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default exchange;
