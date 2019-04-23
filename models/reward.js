const RewardModel = (sequelize, DataTypes) => {
  return sequelize.define(
    'reward',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      usedDate: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {
      tableName: 'reward'
    }
  );
};

export default RewardModel;
