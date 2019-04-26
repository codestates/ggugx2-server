const StoreModel = (sequelize, DataTypes) => {
  return sequelize.define(
    'store',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true
      },
      lattitude: {
        // TODO: correct spelling is 'latitude'
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      longitude: {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      openhour: {
        type: DataTypes.TIME,
        allowNull: true
      },
      closehour: {
        type: DataTypes.TIME,
        allowNull: true
      },
      stamp: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      dayoff: {
        type: DataTypes.STRING,
        allowNull: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      tableName: 'store'
    }
  );
};

export default StoreModel;
