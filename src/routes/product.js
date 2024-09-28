const {
  createProduct,
  findAllProduct,
  findOneProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");
const upload = require("../middleware/uploads/upload");
const {
  verifyToken,
  verifyAdmin,
  isAdmin,
} = require("../middleware/verifyToken");

const productRouter = require("express").Router();

productRouter.post(
  "/",
  verifyAdmin,
  verifyToken,
  upload.single("image"),
  createProduct
);
productRouter.get("/", findAllProduct);
productRouter.get("/:id", findOneProduct);
productRouter.patch("/:id", upload.single("image"), updateProduct);
productRouter.delete("/:id", deleteProduct);

module.exports = productRouter;
