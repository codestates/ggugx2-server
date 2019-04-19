import db from '../models';
const Op = db.Sequelize.Op;

const exchange = async (req, res) => {
  const { customerID, storeID } = req.body;

  try {
    let data = await db.stamps
      .findAll({
        // eslint-disable-next-line
        where: {
          [Op.and]: [
            { CUSTOMER_ID: customerID },
            { STORE_ID: storeID },
            { EXCHANGED_DATE: null }
          ]
        }
      })
      .map(item => item.dataValues);
    if (data.length >= 10) {
      await db.rewards.create({
        MENU_ID: 1,
        CUSTOMER_ID: customerID
      });

      await db.stamps.update(
        { EXCHANGED_DATE: db.Sequelize.NOW() },
        {
          where: {
            [Op.and]: [
              { CUSTOMER_ID: customerID },
              { STORE_ID: storeID },
              { EXCHANGED_DATE: null }
            ]
          }
        }
      );
      console.log('search result: ', data);
    } else {
      res.status(400).json({
        message: "you don't have "
      });
    }
    // 10개인지 확인하고, 10개가 넘으면,
    // reward를 하나 생성하고, 문제가 없으면,
    // 찾았던 stamp 들의 id를 참조해서 EXCHANGE_DATE를 지금으로 업데이트 한다.

    res.status(200).send('success!');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default exchange;
