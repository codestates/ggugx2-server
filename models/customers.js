/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'customers',
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
      PHONE: {
        type: DataTypes.STRING(45),
        allowNull: true
      }
    },
    {
      tableName: 'customers'
    }
  );
};
