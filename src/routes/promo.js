const {
  createPromo,
  findAllPromo,
  findOnePromo,
  updatePromo,
  deletePromo,
} = require("../controllers/promos");
const upload = require("../middleware/uploads/upload");

const promoRouter = require("express").Router();

promoRouter.post("/", upload.single("image"), createPromo);
promoRouter.get("/", findAllPromo);
promoRouter.get("/:id", findOnePromo);
promoRouter.patch("/:id", upload.single("image"), updatePromo);
promoRouter.delete("/:id", deletePromo);

module.exports = promoRouter;
