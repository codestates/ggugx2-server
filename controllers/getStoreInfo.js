import db from '../models';

const Op = db.Sequelize.Op;

const getStoreInfo = async (req, res) => {
  const storeID = req.body.storeID;

  try {
    let storeMenu = await db.menus.findAll({
      attributes: ['NAME', 'PRICE', 'STORE_ID']
    });

    let { dataValues } = storeMenu;
    let stores = { dataValues };

    if (storeID === stores.storeID && (stores.NAME && stores.PRICE !== null)) {
      res.status(200).json(storeMenu);
      console.log('!!!!!!!!!!!!!!!! storeMenu: ', stores.NAME);
      console.log('@@@@@@@@@@@@@@@@@@@@ storeID: ', storeS, ID);
    }
  } catch (err) {
    // if (!stores.NAME || !stores.PRICE) {
    //   res.status(400).send(err.message);
    // } else {
    res.status(500).send(err.message);
    // }
  }
};

export default getStoreInfo;
