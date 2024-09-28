const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { v2: cloudinary } = require("cloudinary");

const upload = multer({
  storage: new CloudinaryStorage({
    cloudinary: cloudinary,
  }),
  limits: {
    fileSize: 3e6,}
});

module.exports = upload;
