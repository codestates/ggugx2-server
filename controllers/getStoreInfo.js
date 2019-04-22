import db from '../models';

const getStoreInfo = async (req, res) => {
  const storeID = req.body.storeID;

  try {
    let storeInfo = await db.stores.findOne({
      attributes: ['ADDRESS', 'OPENHOUR', 'CLOSEHOUR', 'PHONE', 'DAYOFF'],
      where: { id: storeID }
    });

    // let { dataValues } = storeInfo;
    // let store = dataValues;
    // console.log('!!!!!!!!!!!!!!!!!!!!!', store);

    // if (stroeID === store.STORE_ID) {
    res.status(200).json({
      address: storeInfo.ADDRESS,
      openhour: storeInfo.OPENHOUR,
      closehour: storeInfo.CLOSEHOUR,
      contact: storeInfo.PHONE,
      dayoff: storeInfo.DAYOFF
    });
  } catch (err) {
    // if (!stores.NAME || !stores.PRICE) {
    //   res.status(400).send(err.message);
    // } else {
    res.status(400).send(err.message);
    // }
  }
};

export default getStoreInfo;
