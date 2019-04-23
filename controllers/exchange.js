import db from '../models';
import { Op } from 'sequelize';
// TODO: should get the value from database
const EXCHANGE_RATE = 10;

const exchange = async (req, res) => {
  const { customerID, storeID } = req.body;

  try {
    console.log(
      `search stamps of customer ${customerID} in store ${storeID}...`
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

    console.log(`${stampsData.length} stamps found`);
    if (stampsData.length >= EXCHANGE_RATE) {
      console.log(`enough stamps! threshold: ${EXCHANGE_RATE}`);
      console.log(`now searching menus of store ${storeID}...`);
      let menusData = await db.menus.findAll({
        where: {
          STORE_ID: storeID
        }
      });
      let menu = menusData[0].dataValues;

      console.log(`creating reward for menuID: ${menu.id}...`);
      await db.rewards.create({
        MENU_ID: menu.id,
        CUSTOMER_ID: customerID
      });
      console.log('reward created!');
      console.log('updating stamps => USED ...');
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
      console.log('updating fisnished');

      console.log('now searching the stamps and rewards info after exchange');
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

      console.log(
        'result: (stamps, rewards)',
        stampsData.length,
        rewardsData.length
      );
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
