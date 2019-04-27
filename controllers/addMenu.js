import db from '../models';
import {} from '../errorMessages';

const addMenu = async (req, res) => {
  console.log('called addMenu with body: ', req.body);
  const { name, price, storeId } = req.body;

  try {
    let store = await db.store.findByPk(storeId);
    res.status(200).json(req.body);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default addMenu;
