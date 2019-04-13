/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'stores',
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
      },
      ADDRESS: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      OPENHOUR: {
        type: DataTypes.TIME,
        allowNull: true
      },
      CLOSEHOUR: {
        type: DataTypes.TIME,
        allowNull: true
      },
      STAMP: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      DAYOFF: {
        type: DataTypes.STRING(45),
        allowNull: true
      }
    },
    {
      tableName: 'stores'
    }
  );
};
