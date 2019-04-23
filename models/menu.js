const MenuModel = (sequelize, DataTypes) => {
  return sequelize.define(
    'menu',
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
      price: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      tableName: 'menu'
    }
  );
};

export default MenuModel;
