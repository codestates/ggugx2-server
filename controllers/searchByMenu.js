import db from '../models';
const Op = db.Sequelize.Op;

const searchByMenu = async (req, res) => {
  console.log('reached at searchByMenu!, body: ', req.body);
  const {
    customerID: customerId,
    query: keyword,
    coordinate,
    limit
  } = req.body;
  const { lattitude, longitude } = coordinate;
  try {
    console.log('now searching menu by a keyword: ', keyword);
    let menuSearchResult = await db.menu.findAll({
      where: {
        name: {
          [Op.like]: `%${keyword}%`
        }
      },
      attributes: ['name', 'price'],
      include: [
        {
          model: db.store,
          attributes: [
            ['id', 'storeID'],
            ['name', 'storeName'],
            'dayoff',
            'openhour',
            'closehour',
            ['lattitude', 'latitude'],
            ['longitude', 'longitude'],
            [
              db.sequelize.literal(
                '6371000 * acos(cos(radians(' +
                  lattitude +
                  ')) * cos(radians(lattitude)) * cos(radians(' +
                  longitude +
                  ') - radians(longitude)) + sin(radians(' +
                  lattitude +
                  ')) * sin(radians(lattitude)))'
              ),
              'distance'
            ]
          ],
          required: true,
          include: [
            {
              model: db.storeImage,
              required: false,
              attributes: [['url', 'img']],
              where: { isMain: true }
            },
            {
              model: db.stamp,
              attributes: ['id'],
              required: false,
              where: {
                [Op.and]: [{ customerId: customerId }, { exchangedDate: null }]
              }
            }
          ]
        },
        {
          model: db.reward,
          attributes: ['id'],
          required: false,
          where: {
            [Op.and]: [{ customerId: customerId }, { usedDate: null }]
          }
        }
      ]
    });
    console.log(
      `searching finished! ${menuSearchResult.length} results found!`
    );

    let resultsForClient = [];
    for (let i = 0; i < menuSearchResult.length; i++) {
      let { name, price, store, rewards } = menuSearchResult[i];
      let {
        storeID,
        storeName,
        distance,
        dayoff,
        openhour,
        closehour,
        latitude,
        longitude,
        storeimages,
        stamps
      } = store.dataValues;

      let img;
      if (storeimages.length === 0) {
        img = null;
      } else {
        img = storeimages[0].dataValues.img;
      }
      resultsForClient.push({
        menuFound: {
          name,
          price
        },
        storeID,
        storeName,
        latitude,
        longitude,
        distance: parseInt(distance),
        dayoff,
        openhour,
        closehour,
        img,
        stamps: stamps.length,
        rewards: rewards.length
      });
    }
    resultsForClient.sort((a, b) => {
      return a.distance - b.distance;
    });
    res.status(200).json(resultsForClient);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export default searchByMenu;
