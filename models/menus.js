/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'menus',
    {
      ID: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true
      },
      NAME: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      PRICE: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      STORE_ID: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
          model: 'stores',
          key: 'ID'
        }
      }
    },
    {
      tableName: 'menus'
    }
  );
};
