const StoresModel = (sequelize, DataTypes) => {
  return sequelize.define(
    'stores',
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
      ADDRESS: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      OPENHOUR: {
        type: DataTypes.TIME,
        allowNull: true
      },
      CLOSEHOUR: {
        type: DataTypes.TIME,
        allowNull: true
      },
      STAMP: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      DAYOFF: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      PASSWORD: {
        type: DataTypes.STRING(45),
        allowNull: true
      }
    },
    {
      tableName: 'stores'
    }
  );
};

export default StoresModel;
