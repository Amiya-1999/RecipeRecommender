const db = require("../config/db");

exports.getAllRecipes = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;

  try {
    const offset = (page - 1) * pageSize;
    const limit = parseInt(pageSize);

    const [countResult] = await db.execute(
      "SELECT COUNT(*) as totalRecipes FROM recipes"
    );
    const totalRecipes = countResult[0].totalRecipes;
    const [recipes] = await db.execute(
      `SELECT * FROM recipes LIMIT ${limit} OFFSET ${offset}`
    );

    const totalPages = Math.ceil(totalRecipes / pageSize);

    res.status(200).json({
      data: recipes,
      currentPage: parseInt(page),
      pageSize: parseInt(pageSize),
      totalPages,
      totalRecipes,
    });
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
