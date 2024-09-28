const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Transactions = db.define(
  "Transactions",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    total_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    transaction_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    order_id: {
      type: DataTypes.INTEGER,
    },
    payment_meth: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
    shipping_address: {
      type: DataTypes.STRING,
    },
    shipping_cost: {
      type: DataTypes.INTEGER,
    },
    discount: {
      type: DataTypes.FLOAT,
    },
    tax: {
      type: DataTypes.INTEGER,
    },
  },
  { timestamps: true }
);

module.exports = Transactions;
