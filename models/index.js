import Sequelize from 'sequelize';
import CustomersModel from './customer';
import MenuModel from './menu';
import RewardModel from './reward';
import StampModel from './stamp';
import StoreImageModel from './storeimage';
import StoreModel from './store';

const { dbConfig } = require('../config');

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig
);

const customer = CustomersModel(sequelize, Sequelize);
const store = StoreModel(sequelize, Sequelize);
const stamp = StampModel(sequelize, Sequelize);
const reward = RewardModel(sequelize, Sequelize);
const menu = MenuModel(sequelize, Sequelize);
const storeImage = StoreImageModel(sequelize, Sequelize);

stamp.belongsTo(customer);
customer.hasMany(stamp);

stamp.belongsTo(store);
store.hasMany(stamp);

reward.belongsTo(customer);
customer.hasMany(reward);

reward.belongsTo(menu);
menu.hasMany(reward);

menu.belongsTo(store);
store.hasMany(menu);

storeImage.belongsTo(store);
store.hasMany(storeImage);

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
  customer,
  store,
  stamp,
  reward,
  menu,
  storeImage
};

export default db;
