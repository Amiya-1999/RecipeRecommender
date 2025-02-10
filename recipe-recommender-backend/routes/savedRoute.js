const express = require("express");
const {
  getSavedRecipesByUser,
  addSavedRecipes,
  deleteSavedRecipe,
} = require("../controllers/savedController");

const router = express.Router();

router.get("/:userId", getSavedRecipesByUser);
router.post("/add", addSavedRecipes);
router.delete("/remove", deleteSavedRecipe);

module.exports = router;
