const db = require("../config/db");

exports.getAllRecipes = async (req, res) => {
  try {
    const [recipes] = await db.execute("SELECT * FROM recipes");
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRecipeById = async (req, res) => {
  const { id } = req.params;
  try {
    const [recipes] = await db.execute("SELECT * FROM recipes WHERE id = ?", [
      id,
    ]);
    if (recipes.length === 0)
      return res.status(404).json({ message: "Recipe not found" });
    res.status(200).json(recipes[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRecipesByIngredients = async (req, res) => {
  const { ingredients } = req.body;
  try {
    const regexp = ingredients.join("|");
    const [recipes] = await db.execute(
      "SELECT * FROM recipes WHERE ingredients REGEXP ?",
      [regexp]
    );
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addRecipe = async (req, res) => {
  const {
    name,
    description,
    ingredients,
    steps,
    image_url,
    cooking_time,
    cuisine,
    dietary_preferences,
  } = req.body;
  try {
    await db.execute(
      "INSERT INTO recipes (name, description, ingredients, steps, image_url, cooking_time, cuisine, dietary_preferences) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        name,
        description,
        ingredients.join(", "),
        steps.join(", "),
        image_url,
        cooking_time,
        cuisine,
        dietary_preferences,
      ]
    );
    res.status(201).json({ message: "Recipe added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
