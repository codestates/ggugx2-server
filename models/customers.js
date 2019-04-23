const CustomersModel = (sequelize, DataTypes) => {
  return sequelize.define(
    'customers',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      NAME: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      PHONE: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      PASSWORD: {
        type: DataTypes.STRING(45),
        allowNull: true
      }
    },
    {
      tableName: 'customers'
    }
  );
};

export default CustomersModel;
