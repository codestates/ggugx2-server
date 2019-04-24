import db from '../models';

const menuList = async (req, res) => {
  const storeID = req.body.storeID;

  if (!storeID) {
    res.status(400).send('storeID is missing, check storeID again pleaes');
  }

  try {
    let menuList = await db.menu.findAll({
      attributes: ['name', 'price'],
      where: { storeID: storeID },
      raw: true
    });

    if (menuList) {
      res.status(200).json(menuList);
    } else {
      throw new Error('storID not exits!');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default menuList;
