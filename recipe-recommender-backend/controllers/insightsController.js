const db = require("../config/db");

exports.getAllQuickStat = async (req, res) => {
  const { userId } = req.params;
  try {
    const [[counts]] = await db.execute(
      `WITH 
            ingredient_counts AS (
                SELECT TRIM(value) AS ingredient, COUNT(*) AS usage_count FROM recipes,
                    JSON_TABLE(
                        CONCAT('["', REPLACE(ingredients, ',', '","'), '"]'),
                        "$[*]" COLUMNS (value VARCHAR(255) PATH "$")
                ) AS jt
                GROUP BY TRIM(value)
            ),
            RecipeStats AS (
                SELECT r.recipe_id, ROUND(AVG(r.rating), 1) AS avg_rating, COUNT(r.user_id) AS user_count
                    FROM ratings r GROUP BY r.recipe_id
            ),
            HighestRankedRecipes AS (
                SELECT rs.recipe_id, rs.avg_rating, rs.user_count,
                    RANK() OVER (ORDER BY rs.avg_rating DESC) AS rating_rank,
                    RANK() OVER (ORDER BY rs.user_count DESC) AS user_rank
                    FROM RecipeStats rs
            ),
            LowestRankedRecipes AS (
                SELECT rs.recipe_id, rs.avg_rating, rs.user_count,
                    RANK() OVER (ORDER BY rs.avg_rating ASC) AS rating_rank,
                    RANK() OVER (ORDER BY rs.user_count DESC) AS user_rank
                    FROM RecipeStats rs
            )
        SELECT
            (SELECT COUNT(*) FROM recipes) AS totalRecipe,
            (SELECT COUNT(*) FROM recipes WHERE user_id = ?) AS totalRecipesUploadedByUser,
            (SELECT COUNT(*) FROM favorites WHERE user_id = ?) AS totalFavouriteRecipesOfUser,
            (SELECT COUNT(*) FROM saved_recipes WHERE user_id = ?) AS totalRecipesSavedByUser,
            (SELECT COUNT(*) FROM ratings WHERE user_id = ?) AS totalRecipesRatedByUser,
            (SELECT COUNT(DISTINCT(recipe_id)) FROM views WHERE user_id = ?) AS totalRecipesViewedByUser,
            (SELECT JSON_ARRAYAGG(cuisine) FROM 
                (SELECT r.cuisine AS cuisine FROM recipes r JOIN views v ON v.recipe_id = r.id
                    GROUP BY r.cuisine HAVING COUNT(v.recipe_id) = 
                    (SELECT MAX(total_view) FROM 
                        (SELECT COUNT(v.recipe_id) AS total_view FROM recipes r
                            JOIN views v ON v.recipe_id = r.id GROUP BY r.cuisine
                        ) AS cuisineviewquery
                    )
                ) AS outercuisinequery
            ) AS mostPopularCuisine,
            (SELECT CONCAT(FLOOR(SUM(cooking_time) / 60), 'hr ', MOD(SUM(cooking_time), 60), 'min') 
                FROM recipes
            ) AS totalCookingTime,
            (SELECT ROUND(AVG(cooking_time)) FROM recipes) AS avgCookingTime,
            (SELECT COUNT(DISTINCT TRIM(value)) AS total_unique_ingredients FROM recipes, JSON_TABLE(
                CONCAT('["', REPLACE(ingredients, ',', '","'), '"]'), 
                "$[*]" COLUMNS (value VARCHAR(255) PATH "$")) AS jt
            ) AS totalUsedIngredients,
            (SELECT JSON_ARRAYAGG(ingredient) AS most_used_ingredients FROM ingredient_counts
                WHERE usage_count = (SELECT MAX(usage_count) FROM ingredient_counts)
            ) AS mostUsedIngredients,
            (SELECT JSON_ARRAYAGG(dietary_type) FROM
                (SELECT r.dietary_preferences AS dietary_type FROM recipes r JOIN views v ON v.recipe_id = r.id
                    GROUP BY r.dietary_preferences HAVING COUNT(v.recipe_id) = 
                    (SELECT MAX(total_view) FROM 
                        (SELECT COUNT(v.recipe_id) AS total_view FROM recipes r
                            JOIN views v ON v.recipe_id = r.id GROUP BY r.dietary_preferences
                        ) AS dietviewquery
                    )
                ) AS outerdietaryquery
            ) AS mostPopularDietaryType,
            (SELECT JSON_ARRAYAGG(JSON_OBJECT('recipe_name', rec.name, 'avg_rating', CAST(hrr.avg_rating AS CHAR)))
                FROM HighestRankedRecipes hrr 
                JOIN recipes rec ON rec.id = hrr.recipe_id
                WHERE hrr.rating_rank = 1 AND hrr.user_rank = 1
            ) AS highestRatedRecipes,
            (SELECT JSON_ARRAYAGG(JSON_OBJECT('recipe_name', rec.name, 'avg_rating', CAST(lrr.avg_rating AS CHAR)))
                FROM LowestRankedRecipes lrr 
                JOIN recipes rec ON rec.id = lrr.recipe_id
                WHERE lrr.rating_rank = 1 AND lrr.user_rank = 1
            ) AS lowestRatedRecipes`,
      [userId, userId, userId, userId, userId]
    );

    res.status(200).json(counts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
