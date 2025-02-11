const db = require("../config/db");

exports.addView = async (req, res) => {
  const { userId, recipeId } = req.body;

  try {
    // Allow multiple views, but only one per day per user per recipe
    const [existingView] = await db.execute(
      "SELECT * FROM views WHERE user_id = ? AND recipe_id = ? AND DATE(created_at) = CURDATE()",
      [userId, recipeId]
    );

    if (existingView.length > 0) {
      return res
        .status(400)
        .json({ message: "View already recorded for today" });
    }

    await db.execute(
      "INSERT INTO views (user_id, recipe_id, created_at) VALUES (?, ?, NOW())",
      [userId, recipeId]
    );

    res.status(201).json({ message: "Recipe view recorded" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRecipesViewedByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const [views] = await db.execute(
      `
            SELECT recipes.*
            FROM views
            INNER JOIN recipes ON views.recipe_id = recipes.id
            WHERE views.user_id = ?;
            `,
      [userId]
    );
    res.status(200).json(views);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
