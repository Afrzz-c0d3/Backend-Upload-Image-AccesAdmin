const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Promos = db.define("Promos", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  promo_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  promo_code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  discount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
  },
});

module.exports = Promos;
