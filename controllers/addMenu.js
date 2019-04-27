import db from '../models';
import { STORE_NOT_EXISTS } from '../errorMessages';

const addMenu = async (req, res) => {
  console.log('called addMenu with body: ', req.body);
  const { name, price, storeId } = req.body;

  try {
    let store = await db.store.findByPk(storeId);
    if (!store) {
      throw new Error(STORE_NOT_EXISTS);
    }

    let newMenu = await db.menu.create({
      name,
      price
    });
    newMenu.setStore(store);

    res.status(201).send('a menu successfully added!');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default addMenu;
