const StoreImageModel = function(sequelize, DataTypes) {
  return sequelize.define(
    'storeimage',
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
      tableName: 'storeimage'
    }
  );
};

export default StoreImageModel;
