const MenusModel = (sequelize, DataTypes) => {
  return sequelize.define(
    'menus',
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
      PRICE: {
        type: DataTypes.STRING(45),
        allowNull: true
      }
    },
    {
      tableName: 'menus'
    }
  );
};

export default MenusModel;
