const db = require("../config/db");
const Transactions = require("../models/Transactions");

const createTransaction = async (req, res) => {
  try {
    const {
      transaction_id,
      total_amount,
      transaction_type,
      transaction_date,
      description,
      order_id,
      payment_meth,
      status,
      shipping_address,
      shipping_cost,
      discount,
      tax,
    } = req.body;
    const file = req?.file ? req.file?.path : null;
    const data = await Transactions.create({
      transaction_id,
      total_amount,
      transaction_type,
      transaction_date,
      description,
      order_id,
      payment_meth,
      status,
      shipping_address,
      shipping_cost,
      discount,
      tax,
    });
    res.status(201).json({ msg: "success create transaction", data });
  } catch (error) {
    console.log({ error });
    res.status(400).json({ msg: "failed create transaction", error });
  }
};
const findAllTransaction = async (req, res) => {
  const { search, orderBy, sortBy, limit, page, category } = req.query;
  const offset = (page - 1) * limit || 0;
  const where = {};
  let order = [];
  
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
      [Op.like] : `%${search}%`,
    };
    where.category = {
      [Op.iLike] : category
    }
  }
  if (orderBy && sortBy) {
    order = [[orderBy, `${sortBy}`]];
  }
  try {
    const data = await Transactions.findAll({
      where,
      limit,
      offset,
      order,
    });
    res.status(200).json({ msg: "success find all transaction", data });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error });
  }
};

const findOneTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Transactions.findByPk(id);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      total_amount,
      transaction_type,
      description,
      order_id,
      payment_meth,
      status,
      shipping_address,
      shipping_cost,
      discount,
      tax,
    } = req.body;
    const transaction = await Transactions.findByPk(id);
    if (!transaction) {
      return res.status(404).json({ msg: "transaction not found" });
    }
    await transaction.update({
      total_amount,
      transaction_type,
      description,
      order_id,
      payment_meth,
      status,
      shipping_address,
      shipping_cost,
      discount,
      tax,
    });
    await transaction.save();
    res
      .status(200)
      .json({ msg: "success update transaction", data: transaction });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ msg: "failed update transaction", error });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transactions.findByPk(id);
    if (!transaction) {
      return res.status(404).json({ msg: "transaction not found" });
    }
    await transaction.destroy();
    await transaction.save();
    res
      .status(200)
      .json({ msg: "success delete transaction", data: transaction });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ msg: "failed delete transaction", error });
  }
};

module.exports = {
  createTransaction,
  findAllTransaction,
  findOneTransaction,
  updateTransaction,
  deleteTransaction,
};
