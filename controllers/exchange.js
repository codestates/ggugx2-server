import db from '../models';
const Op = db.Sequelize.Op;

const exchange = async (req, res) => {
  try {
    let searchResult = await db.stamps.findAll({
      // eslint-disable-next-line
      where: {
        [Op.and]: [
          { CUSTOMER_ID: req.body.customerID },
          { STORE_ID: req.body.storeID },
          { EXCHANGED_DATE: null }
        ]
      }
    });
    // 10개인지 확인하고, 10개가 넘으면,
    // reward를 하나 생성하고, 문제가 없으면,
    // 찾았던 stamp 들의 id를 참조해서 EXCHANGE_DATE를 지금으로 업데이트 한다.
    console.log('search result: ', searchResult);

    res.status(200).send('success!');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default exchange;
