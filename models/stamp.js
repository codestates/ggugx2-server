const StampModel = (sequelize, DataTypes) => {
  return sequelize.define(
    'stamp',
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
      tableName: 'stamp'
    }
  );
};

export default StampModel;
