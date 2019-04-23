const StoreImagesModel = function(sequelize, DataTypes) {
  return sequelize.define(
    'storeimages',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      url: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      isMain: {
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
