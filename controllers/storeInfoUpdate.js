import db from '../models';

const storeInfoUpdate = async (req, res) => {
  const { storeId, target, value } = req.body;
  try {
    let storeUpdate = await db.store.update(
      { exchangedDate: db.Sequelize.fn('NOW'), [target]: value },
      {
        where: {
          id: storeId
        }
      }
    );
    res.status(200).send(storeUpdate);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default storeInfoUpdate;
