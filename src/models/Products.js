const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Products = db.define(
  "Products",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.STRING,
    },
    size: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    delivery_meth: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category : {
      type: DataTypes.STRING,
    }
  },
  { timestamps: true }
);

module.exports = Products;
