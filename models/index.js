import Sequelize from 'sequelize';
import CustomersModel from './customers';
import MenusModel from './menus';
import RewardsModel from './rewards';
import StampsModel from './stamps';
import StoreImagesModel from './storeimages';
import StoresModel from './stores';

const { dbConfig } = require('../config');

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig
);

const customers = CustomersModel(sequelize, Sequelize);
const stores = StoresModel(sequelize, Sequelize);
const stamps = StampsModel(sequelize, Sequelize);
const rewards = RewardsModel(sequelize, Sequelize);
const menus = MenusModel(sequelize, Sequelize);
const storeImages = StoreImagesModel(sequelize, Sequelize);

stamps.belongsTo(customers);
stamps.belongsTo(stores);
rewards.belongsTo(customers);
rewards.belongsTo(stores);

menus.belongsTo(stores);
storeImages.belongsTo(stores);

// to set environment variable
// $ export DATABASE_RESET=true
// to unset
// $ unset DATABASE_RESET
if (process.env.DATABASE_RESET) {
  sequelize.sync({ force: true }).then(() => {
    console.log('Database & tables created!');
  });
}

const db = {
  sequelize,
  Sequelize,
  customers,
  stores,
  stamps,
  rewards,
  menus,
  storeImages
};

export default db;
