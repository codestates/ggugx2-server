const StampsModel = (sequelize, DataTypes) => {
  return sequelize.define(
    'stamps',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      exchangedDate: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {
      tableName: 'stamps'
    }
  );
};

export default StampsModel;
