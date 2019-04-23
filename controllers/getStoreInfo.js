import db from '../models';

const getStoreInfo = async (req, res) => {
  const storeID = req.body.storeID;

  if (!storeID) {
    throw new Error('storeID is missing, check storeID again please');
  }

  try {
    let storeInfo = await db.stores.findOne({
      attributes: ['ADDRESS', 'OPENHOUR', 'CLOSEHOUR', 'PHONE', 'DAYOFF'],
      where: { id: storeID }
    });

    if (
      storeInfo.ADDRESS !== null &&
      storeInfo.OPENHOUR !== null &&
      storeInfo.CLOSEHOUR !== null &&
      storeInfo.PHONE !== null &&
      storeInfo.DAYOFF !== null
    ) {
      res.status(200).json({
        storeInfos: {
          address: storeInfo.ADDRESS,
          openhour: storeInfo.OPENHOUR,
          closehour: storeInfo.CLOSEHOUR,
          contact: storeInfo.PHONE,
          dayoff: storeInfo.DAYOFF
        }
      });
    } else {
      throw new Error('Information is missing, please fil out the data');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};
export default getStoreInfo;
