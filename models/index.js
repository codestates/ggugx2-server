import Sequelize from 'sequelize';
import CustomersModel from './customers';
import MenusModel from './menus';
import RewardsModel from './rewards';
import StampsModel from './stamps';
import StoreImagesModel from './storeimages';
import StoresModel from './stores';

const { dbConfig } = require('../config');

export const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig
);

export const customers = CustomersModel(sequelize, Sequelize);
export const stores = StoresModel(sequelize, Sequelize);
export const stamps = StampsModel(sequelize, Sequelize);
export const rewards = RewardsModel(sequelize, Sequelize);
export const menus = MenusModel(sequelize, Sequelize);
export const storeImages = StoreImagesModel(sequelize, Sequelize);

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
