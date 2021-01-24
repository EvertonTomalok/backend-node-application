const { DataTypes, Model } = require("sequelize");
const sequelize = require("../helpers/database-sequelize");

class Tools extends Model {}

Tools.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Tools",
    tableName: "tools",
  },
);

module.exports = Tools;
