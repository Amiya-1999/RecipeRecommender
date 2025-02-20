const db = require("../config/db");

exports.addFavorite = async (req, res) => {
  const { userId, recipeId } = req.body;

  try {
    const [existingFavorite] = await db.execute(
      "SELECT * FROM favorites WHERE user_id = ? AND recipe_id = ?",
      [userId, recipeId]
    );
    if (existingFavorite.length > 0) {
      return res
        .status(400)
        .json({
          message: "Recipe already in favorites",
          alreadyFavourite: true,
        });
    }

    await db.execute(
      "INSERT INTO favorites (user_id, recipe_id) VALUES (?, ?)",
      [userId, recipeId]
    );
    res
      .status(201)
      .json({ message: "Recipe added to favorites", alreadyFavourite: false });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFavoritesByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const [favorites] = await db.execute(
      `
            SELECT recipes.*
            FROM favorites
            INNER JOIN recipes ON favorites.recipe_id = recipes.id
            WHERE favorites.user_id = ?;
            `,
      [userId]
    );
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeFavorite = async (req, res) => {
  const { userId, recipeId } = req.body;

  try {
    await db.execute(
      "DELETE FROM favorites WHERE user_id = ? AND recipe_id = ?",
      [userId, recipeId]
    );
    res.status(200).json({ message: "Recipe removed from favorites" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
