const express = require("express");
const {
  addFavorite,
  getFavoritesByUser,
  removeFavorite,
} = require("../controllers/favoriteController");

const router = express.Router();

router.get("/:userId", getFavoritesByUser);
router.post("/add", addFavorite);
router.delete("/remove", removeFavorite);

module.exports = router;
