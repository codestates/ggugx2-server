const RewardsModel = (sequelize, DataTypes) => {
  return sequelize.define(
    'rewards',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      USED_DATE: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {
      tableName: 'rewards'
    }
  );
};

export default RewardsModel;
