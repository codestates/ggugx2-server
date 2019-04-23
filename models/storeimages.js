const StoreImagesModel = function(sequelize, DataTypes) {
  return sequelize.define(
    'storeimages',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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

export default StoreImagesModel;
