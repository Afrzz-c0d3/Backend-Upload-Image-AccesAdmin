// untuk menambahkan product (CREATE)

const { Op } = require("sequelize");
const db = require("../config/db");
const Products = require("../models/products");

const createProduct = async (req, res) => {
  try {
    const { name, price, description, size, stock, delivery_meth, image } =
      req.body; //menangkap inputan dari user

    const file = req.file ? req.file?.path : null;
    console.log(file);

    const data = await Products.create({
      name,
      price,
      description,
      size,
      stock,
      delivery_meth,
      image: file,
    }); // masukin datanya ke database

    // memberikan response ke clients
    res.status(201).json({ msg: "success create product" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "failed create product", error });
  }
};

// untuk melihat seluruh product (READ)
const findAllProduct = async (req, res) => {
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
    const data = await Products.findAll({
      where,
      order,
      limit,
      offset,
    });
    res.status(200).json({ msg: "success find all product", data });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error });
  }
};

// untuk melihat satu product (READ)
const findOneProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await db.query(`select * from "Products" p where id = ${id}`);
    res.status(200).json({ data: data[0] });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error });
  }
};

// untuk mengupdate product (UPDATE)
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, size, stock, delivery_meth } = req.body;
    const image = req.file ? req.file?.path : null;
    const product = await Products.findByPk(id);
    if (!product) {
      return res.status(404).json({ msg: "product not found" });
    }
    if (req.file) {
      await product.update({
        name,
        price,
        description,
        size,
        stock,
        delivery_meth,
        image,
      });
      return res
        .status(200)
        .json({ msg: "success update product with image", product });
    }
    await product.update({
      name,
      price,
      description,
      size,
      stock,
      delivery_meth,
    });
    await product.save();
    res.status(200).json({ msg: "success update product", product });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error });
  }
};

// untuk menghapus product (DELETE)
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Products.findByPk(id);
    if (!product) {
      return res.status(404).json({ msg: "product not found" });
    }
    await product.destroy();
    await product.save();
    res.status(200).json({ msg: "success delete product", data: product });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error });
  }
};

module.exports = {
  createProduct,
  findAllProduct,
  findOneProduct,
  updateProduct,
  deleteProduct,
};
