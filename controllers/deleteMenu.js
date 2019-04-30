import db from '../models';
import { STORE_NOT_EXISTS } from '../errorMessages';

const deleteMenu = async (req, res) => {
  console.log('this is deleteMenu Request Body', req.body);
  const { storeId, name } = req.body;

  try {
    let store = await db.store.findByPk(storeId);
    if (!store) {
      throw new Error(STORE_NOT_EXISTS);
    }

    let delMenu = await db.menu.destroy({
      where: {
        storeId: storeId,
        name: name
      }
    });
    console.log(delMenu);
    res.status(201).send('a menu successfully deleted!');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default deleteMenu;
