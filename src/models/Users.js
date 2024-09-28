const { DataTypes } = require("sequelize");

const db = require("../config/db");

const Users = db.define(
  "Users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_address : {
      type : DataTypes.STRING,
      allowNull : false
    },
    image : {
      type : DataTypes.STRING,
      allowNull : true
    },
    role : {
      type : DataTypes.STRING,
    },
    status : {
      type : DataTypes.BOOLEAN,
      allowNull : true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = Users;