const express = require("express");
const { getAllQuickStat } = require("../controllers/insightsController");

const router = express.Router();

router.get("/:userId", getAllQuickStat);

module.exports = router;
