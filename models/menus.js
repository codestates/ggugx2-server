const MenusModel = (sequelize, DataTypes) => {
  return sequelize.define(
    'menus',
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
      tableName: 'menus'
    }
  );
};

export default MenusModel;
