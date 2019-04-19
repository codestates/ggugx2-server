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
    if (data.length >= 2) {
      await db.rewards.create({
        MENU_ID: 1,
        CUSTOMER_ID: customerID
      });

      await db.stamps.update(
        { EXCHANGED_DATE: db.Sequelize.fn('NOW') },
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
      res.status(200).send('success!');
    } else {
      res.status(400).json({
        message: "you don't have enough stamps",
        numOfStamps: data.length
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
