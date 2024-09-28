const {
  createTransaction,
  findAllTransaction,
  findOneTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transaction");
const transactionRouter = require("express").Router();

transactionRouter.post("/", createTransaction);
transactionRouter.get("/", findAllTransaction);
transactionRouter.get("/:id", findOneTransaction);
transactionRouter.patch("/:id", updateTransaction);
transactionRouter.delete("/:id", deleteTransaction);

module.exports = transactionRouter;
