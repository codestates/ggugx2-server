'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
let config = require('../config/config.json')[env];
const db = {};

let sequelize;
if (env === 'production') {
  config = {
    username: process.env.NODE_DATABASE_USERNAME,
    password: process.env.NODE_DATABASE_PASSWORD,
    database: process.env.NODE_DATABASE_NAME,
    host: process.env.NODE_DATABASE_HOST,
    port: process.env.NODE_DATABASE_PORT,
    dialect: process.env.NODE_DATABASE_DIALECT
  };
}

sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// if (env === 'development') {
//   sequelize.sync({ force: true }).then(() => {
//     console.log('Database & tables created!');
//   });
// }

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
