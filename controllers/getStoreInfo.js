import db from '../models';

const getStoreInfo = async (req, res) => {
  const storeID = req.body.storeID;

  //storeID가 없는 것은 요청이 잘못 들어왔기때문에 res.status code를 400으로 보내줘야 한다
  if (!storeID) {
    res.status(400).send('storeID is missing, check storeID again please');
  }

  try {
    let storeInfo = await db.store.findOne({
      attributes: [
        'name',
        'address',
        'openhour',
        'closehour',
        ['phone', 'contact'],
        'dayoff'
      ],
      where: { id: storeID },
      include: [
        {
          model: db.storeImage,
          required: false,
          attributes: [['url', 'imgUrl']],
          where: { isMain: true }
        }
      ]
    });
    if (storeInfo) {
      const {
        name,
        address,
        openhour,
        closehour,
        contact,
        dayoff,
        storeimages
      } = storeInfo.dataValues;

      let imgUrl;
      if (storeimages.length !== 0) {
        storeimages[0].dataValues;
      }

      res.status(200).json({
        name,
        address,
        openhour,
        closehour,
        contact,
        dayoff,
        imgUrl
      });
    } else {
      throw new Error('storeID not exits!');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};
export default getStoreInfo;
