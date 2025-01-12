const express = require("express");
const {
  getAllRecipes,
  getRecipeById,
  getRecipesByIngredients,
  addRecipe,
} = require("../controllers/recipeController");

const router = express.Router();

router.get("/", getAllRecipes);
router.get("/:id", getRecipeById);
router.post("/search", getRecipesByIngredients);
router.post("/add", addRecipe);

module.exports = router;
