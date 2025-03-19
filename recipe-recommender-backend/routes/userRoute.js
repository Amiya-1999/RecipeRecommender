const express = require("express");
const { registerUser, loginUser, getUser, deleteUser, updateUser, resetPassword } = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:userId", getUser);
router.delete("/remove/:userId", deleteUser);
router.put("/update/:userId", updateUser)
router.put("/reset/password", resetPassword);

module.exports = router;
