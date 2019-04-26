import db from '../models';
const MAX_NUM_OF_STORES = 5;

const getNearestStores = async (req, res) => {
  console.log('called getNearestStores, body: ', req.body);
  const { lattitude, longitude } = req.body;
  console.log(`lattitude: ${lattitude}, longitude: ${longitude}`);

  try {
    console.log('now searching stores around customer');
    let result = await db.store
      .findAll({
        limit: MAX_NUM_OF_STORES,
        attributes: [['id', 'storeID'], ['name', 'storeName']]
      })
      .map(item => {
        item.dataValues.distance = 123;
        return item.dataValues;
      });
    console.log('result: ', result);

    res.status(200).json(result);
  } catch (err) {
    console.log('ERROR: ', err.message);
    res.status(500).send(err.message);
  }
};

export default getNearestStores;
