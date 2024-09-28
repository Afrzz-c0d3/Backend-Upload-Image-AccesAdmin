const express = require("express");
const db = require("./src/config/db");
const dotenv = require("dotenv");
const Products = require("./src/models/products");
const Users = require("./src/models/Users");
const route = require("./src/routes");
const Transactions = require("./src/models/Transactions");
const Promos = require("./src/models/Promos");
const cloudinaryConfig = require("./src/config/cloudinary");

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(express.static(__dirname));

// Users.sync()
//   .then(() => {
//     console.log(`database syncronize`);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// body parser
app.use(cloudinaryConfig)

app.use(route);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/about", (req, res) => {
  res.json({ msg: "About Page" });
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
