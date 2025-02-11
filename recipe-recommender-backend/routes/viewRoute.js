const express = require("express");
const { addView, getRecipesViewedByUser } = require("../controllers/viewController");

const router = express.Router();

router.get("/:userId", getRecipesViewedByUser);
router.post("/add", addView);

module.exports = router;
