const {
  createUser,
  findAllUser,
  findOneUser,
  updateUser,
  deleteUser,
  updateRole,
} = require("../controllers/users");
const upload = require("../middleware/uploads/upload");
const { verifyAdmin } = require("../middleware/verifyToken");

const userRouter = require("express").Router();

userRouter.post("/", upload.single("image"), createUser);
userRouter.get("/", findAllUser);
userRouter.get("/:id", findOneUser);
userRouter.patch("/:id", upload.single("image"), updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.patch("/:id/role", verifyAdmin, updateRole);

module.exports = userRouter;
