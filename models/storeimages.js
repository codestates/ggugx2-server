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
        type: DataTypes.STRING,
        allowNull: true
      },
      isMain: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      }
    },
    {
      tableName: 'storeimages'
    }
  );
};

export default StoreImagesModel;
