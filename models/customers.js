/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'customers',
    {
      NAME: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      PHONE: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      PASSWORD: {
        type: DataTypes.STRING(45),
        allowNull: true
      }
    },
    {
      tableName: 'customers'
    }
  );
};
