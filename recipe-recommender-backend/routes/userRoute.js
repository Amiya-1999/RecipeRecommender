const express = require("express");
const { registerUser, loginUser, getUser, deleteUser } = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:userId", getUser);
router.delete("/remove/:userId", deleteUser);

module.exports = router;
