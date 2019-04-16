/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'stamps',
    {
      CUSTOMER_ID: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
          model: 'customers',
          key: 'ID'
        }
      },
      STORE_ID: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
          model: 'stores',
          key: 'ID'
        }
      },
      EXCHANGED_DATE: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {
      tableName: 'stamps'
    }
  );
};
