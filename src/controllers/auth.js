const { JsonWebTokenError } = require("jsonwebtoken");
const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const {
      username,
      email,
      password: userPassword,
      phone,
      user_address,
      image,
      status,
    } = req.body;
    const salt = await bcrypt.genSalt(5);

    const encryptPassword = await bcrypt.hash(userPassword, salt);
    const data = await Users.create({
      username,
      email,
      password: encryptPassword,
      role: "user",
      phone,
      user_address,
      image,
      status,
    });
    res.status(201).json({ msg: "success create user" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "failed create user", error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ where: { email } });
    // mengecek apakah ada user atau tidak
    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }
    const userPassword = user.getDataValue("password");
    // membandingkan user dengan password
    const match = await bcrypt.compare(password, userPassword);
    if (!match) {
      return res.status(404).json({ msg: "email & password not found" });
    }
    const token = jwt.sign(
      { email, id : user.getDataValue("id"), role : user.getDataValue("role") },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ msg: "success login", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "failed create user", error });
  }
};

module.exports = { register, login };
