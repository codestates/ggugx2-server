import db from '../models';

const getStoreInfo = async (req, res) => {
  const storeID = req.body.storeID;

  //storeID가 없는 것은 요청이 잘못 들어왔기때문에 res.status code를 400으로 보내줘야 한다
  if (!storeID) {
    res.status(400).send('storeID is missing, check storeID again please');
  }

  try {
    let storeInfo = await db.stores.findOne({
      attributes: ['ADDRESS', 'OPENHOUR', 'CLOSEHOUR', 'PHONE', 'DAYOFF'],
      where: { id: storeID }
    });

    if (storeInfo) {
      //값중에 하나라도 null이 아닐 경우'ok' 응답 해준다
      res.status(200).json({
        address: storeInfo.ADDRESS,
        openhour: storeInfo.OPENHOUR,
        closehour: storeInfo.CLOSEHOUR,
        contact: storeInfo.PHONE,
        dayoff: storeInfo.DAYOFF
      });
    } else {
      throw new Error('storeID not exits!');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};
export default getStoreInfo;
