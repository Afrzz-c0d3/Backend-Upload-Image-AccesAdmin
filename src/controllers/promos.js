const db = require("../config/db");
const Promos = require("../models/Promos");

const createPromo = async (req, res) => {
  try {
    const { promo_id, promo_code, description, discount, image } = req.body;
    const file = req.file ? req.file?.path : null;

    const data = await Promos.create({
      promo_id,
      promo_code,
      description,
      discount,
      image: file,
    });
    res.status(201).json({ msg: "success create promo", data: data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "failed create promo", error });
  }
};

const findAllPromo = async (req, res) => {
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
    const data = await Promos.findAll({
      where,
      order,
      limit,
      offset,
    });
    res.status(200).json({ msg: "success find all promo", data });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ msg: "failed find all promo", error });
  }
};

const findOnePromo = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Promos.findByPk(id);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(505).json({ error });
  }
};

const updatePromo = async (req, res) => {
  try {
    const { id } = req.params;
    const { promo_id, promo_code, description, discount, image } = req.body;
    const file = req.file ? req.file?.path : null;
    const promo = await Promos.findByPk(id);
    if (!promo) {
      return res.status(404).json({ msg: "promo no found", promo });
    }
    if (req.file) {
      await promo.update({ promo_id, promo_code, description, discount, image: file });
      return res
        .status(200)
        .json({ msg: "success update promo with image", promo });
    }
    await promo.save();
    res.status(200).json({ msg: "succes update", promo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "update failed", error });
  }
};

const deletePromo = async (req, res) => {
  try {
    const { id } = req.params;
    const promo = await Promos.findByPk(id);
    if (!promo) {
      return res.status(404).json({ msg: "ID promo no detected" });
    }
    await promo.destroy();
    await promo.save();
    res.status(200).json({ msg: "delete promo success", promo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "failed delete promo", error });
  }
};

module.exports = {
  createPromo,
  findAllPromo,
  findOnePromo,
  updatePromo,
  deletePromo,
};
