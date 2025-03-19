const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const [users] = await db.execute("SELECT * FROM users WHERE ID=?", [
      userId,
    ]);
    const user = users[0] || {};
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    await db.execute("DELETE FROM users WHERE ID=?", [userId]);
    res.status(200).json({ message: "Account deleted successfully!" });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  const { name, email, password } = req.body;
  const { userId } = req.params;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.execute(
      "UPDATE users SET name=?, email=?, password=? WHERE id=?",
      [name, email, hashedPassword, userId]
    );
    res.status(201).json({
      message: "User updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.resetPassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [users] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (users.length === 0)
      return res.status(404).json({ message: "User not found" });
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.execute("UPDATE users SET password=? WHERE email=?", [
      hashedPassword,
      email,
    ]);
    res.status(201).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const [users] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (users.length !== 0)
      return res.status(404).json({ message: "User already exist" });
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.execute(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );
    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [users] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (users.length === 0)
      return res.status(404).json({ message: "User not found" });
    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid password" });
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
