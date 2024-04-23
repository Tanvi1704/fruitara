const express = require("express");
const {
  createFood,
  getAllFoods,
  getFoodById,
  getNewFoods,
  getFoodsFromDistinctCatagory,
  getTopRating,
} = require("../controller/food");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/addfood", protect, createFood);
router.get("/getAllFoods", getAllFoods);
router.get("/getNewFoods", getNewFoods);
router.get("/getTopRated", getTopRating);
router.get("/specialFoods", getFoodsFromDistinctCatagory);
router.get("/getFood/:id", getFoodById);

module.exports = router;
