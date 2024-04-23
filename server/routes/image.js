const express = require("express");
const multer = require("multer");
const ExpressFormidable = require("express-formidable");
const { imageUploadControllers } = require("../controller/ImageUpload");

const router = express.Router();

router.post(
  "/upload-image",
  ExpressFormidable({ maxFieldSize: 5 * 2024 * 2024 }),
  imageUploadControllers
);

module.exports = router;
