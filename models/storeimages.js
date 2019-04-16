/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'storeimages',
    {
      STORE_ID: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
          model: 'stores',
          key: 'ID'
        }
      },
      URL: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      IS_MAIN: {
        type: DataTypes.INTEGER(1),
        allowNull: true
      }
    },
    {
      tableName: 'storeimages'
    }
  );
};
