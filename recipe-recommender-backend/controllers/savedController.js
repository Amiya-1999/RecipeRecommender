const db = require("../config/db");

exports.addSavedRecipes = async (req, res) => {
  const { userId, recipeId } = req.body;

  try {
    const [existingSaved] = await db.execute(
      "SELECT * FROM saved_recipes WHERE user_id = ? AND recipe_id = ?",
      [userId, recipeId]
    );
    if (existingSaved.length > 0) {
      return res
        .status(400)
        .json({ message: "Recipe already Saved", alreadySaved: true });
    }

    await db.execute(
      "INSERT INTO saved_recipes (user_id, recipe_id) VALUES (?, ?)",
      [userId, recipeId]
    );
    res
      .status(201)
      .json({ message: "Recipe saved successfully", alreadySaved: false });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSavedRecipesByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const [savedRecipes] = await db.execute(
      `
            SELECT recipes.*
            FROM saved_recipes
            INNER JOIN recipes ON saved_recipes.recipe_id = recipes.id
            WHERE saved_recipes.user_id = ?;
            `,
      [userId]
    );
    res.status(200).json(savedRecipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSavedRecipe = async (req, res) => {
  const { userId, recipeId } = req.body;

  try {
    await db.execute(
      "DELETE FROM saved_recipes WHERE user_id = ? AND recipe_id = ?",
      [userId, recipeId]
    );
    res.status(200).json({ message: "Recipe has been unsaved successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
