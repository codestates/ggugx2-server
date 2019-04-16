/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'rewards',
    {
      MENU_ID: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
          model: 'menus',
          key: 'ID'
        }
      },
      CUSTOMER_ID: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
          model: 'customers',
          key: 'ID'
        }
      },
      USED_DATE: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {
      tableName: 'rewards'
    }
  );
};
