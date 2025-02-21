const express = require("express");
const {
  getAllRecipes,
  getRecipeById,
  getRecipesByIngredients,
  addRecipe,
  getRecipesByUser,
  getAllIngredient,
} = require("../controllers/recipeController");

const router = express.Router();

router.get("/", getAllRecipes);
router.get("/ingredients", getAllIngredient);
router.get("/:id", getRecipeById);
router.post("/search", getRecipesByIngredients);
router.post("/add/:userId", addRecipe);
router.get("/user/:userId", getRecipesByUser);

module.exports = router;
