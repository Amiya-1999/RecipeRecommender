const db = require("../config/db");

exports.getAllRecipes = async (req, res) => {
  try {
    const [recipes] = await db.execute(`SELECT * FROM recipes;`);

    res.status(200).json({
      data: recipes,
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
  const { ingredients, type } = req.body;
  try {
    let recipes = [];
    if (type === "all") {
      const conditions = ingredients
        .map(() => "LOWER(ingredients) LIKE ?")
        .join(" AND ");
      [recipes] = await db.execute(
        `SELECT * FROM recipes WHERE ${conditions}`,
        ingredients.map((ing) => `%${ing.toLowerCase()}%`)
      );
    } else if (type === "any") {
      const regexp = ingredients.map((ing) => ing.toLowerCase()).join("|");
      [recipes] = await db.execute(
        "SELECT * FROM recipes WHERE LOWER(ingredients) REGEXP ?",
        [regexp]
      );
    }

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
  const { userId } = req.params;
  try {
    await db.execute(
      "INSERT INTO recipes (name, description, ingredients, steps, image_url, cooking_time, cuisine, dietary_preferences, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        name,
        description,
        ingredients,
        steps,
        image_url,
        cooking_time,
        cuisine,
        dietary_preferences,
        userId,
      ]
    );
    res.status(201).json({ message: "Recipe added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRecipesByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const [recipes] = await db.execute(
      `SELECT * FROM recipes WHERE user_id=?;`,
      [userId]
    );
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllIngredient = async (req, res) => {
  try {
    const [ingredients] = await db.execute(
      `SELECT DISTINCT TRIM(value) AS ingredient FROM recipes, JSON_TABLE(
        CONCAT('["', REPLACE(ingredients, ',', '","'), '"]'), 
        "$[*]" COLUMNS (value VARCHAR(255) PATH "$")) AS jt`
    );
    const ingredientsList = ingredients.map((row) => row.ingredient);
    res.status(200).json(ingredientsList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
