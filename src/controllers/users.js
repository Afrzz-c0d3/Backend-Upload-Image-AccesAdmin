const db = require("../config/db");
const Users = require("../models/Users");

const createUser = async (req, res) => {
  try {
    const { username, email, password, phone, user_address, image, status } =
      req.body; //menangkap inputan dari user
    const file = req.file ? req.file?.path : null;

    const data = await Users.create({
      username,
      email,
      password,
      phone,
      user_address,
      image: file,
      status,
    }); // masukin datanya ke database

    res.status(201).json({ msg: "success create user", data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "failed create user", error });
  }
};

const findAllUser = async (req, res) => {
  const { search, orderBy, sortBy, limit, page, category } = req.query;
  const offset = (page - 1) * limit || 0; // pagination
  const where = {}; // search
  let order = []; // short

  if (search) {
    where.name = {
      [Op.like]: `%${search}%`,
    };
  }

  if (category) {
    where.category = category;
  }

  if (search && category) {
    where.name = {
      [Op.like]: `%${search}%`,
    };
    where.category = {
      [Op.iLike]: category,
    };
  }

  if (orderBy && sortBy) {
    order = [[orderBy, `${sortBy}`]];
  }

  try {
    const data = await Users.findAll({
      where,
      limit,
      offset,
      order,
    });
    res.status(200).json({ msg: "success find all user", data });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error });
  }
};

const findOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await db.query(`select * from "Users" u where id = ${id}`);
    res.status(200).json({ data: data[0] });
  } catch (error) {
    console.log({ err });
    res.status(500).json({ err });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password, phone, user_address, image, status } =
      req.body;
    const file = req.file ? req.file?.path : null;
    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }

    if (req.file) {
      await user.update({
        username,
        email,
        password,
        phone,
        user_address,
        image: file,
        status,
      });
      return res
        .status(200)
        .json({ msg: "success update profile image", user });
    }
    await user.update({
      username,
      email,
      password,
      phone,
      user_address,
      status,
    });
    await user.save();
    res.status(200).json({ msg: "success update user", data: user });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ msg: "failed update user", error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }
    await user.destroy();
    await user.save();
    res.status(200).json({ msg: "success delete user", data: user });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ msg: "failed delete user", error });
  }
};

const updateRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  const user = await Users.findByPk(id, { role: role }, { new: true });
  try {
    if (!['admin', 'user'].includes(role)) {
      return res.status(400).json({ msg: "Role tidak valid. Harus 'admin' atau 'user'." });
    }
    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }
    await user.update({ role });
    await user.save();
    res.status(200).json({ msg: "Berhasil mengupdate role", data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "gagal mengupdate role", error });
  }
};

module.exports = {
  createUser,
  findAllUser,
  findOneUser,
  updateUser,
  deleteUser,
  updateRole,
};
