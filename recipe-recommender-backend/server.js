const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

//get all routes
const userRoutes = require("./routes/userRoute");
const recipeRoutes = require("./routes/recipeRoute");
const favoriteRoutes = require("./routes/favoriteRoute");
const savedRoutes = require("./routes/savedRoute");
const viewRoutes = require("./routes/viewRoute");
const insightsRoutes = require("./routes/insightsRoute");

dotenv.config();
const port = process.env.PORT || 4200;
const app = express();

app.use(cors());
app.use(bodyParser.json());

//use routes
app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/saved", savedRoutes);
app.use("/api/view", viewRoutes);
app.use("/api/insights", insightsRoutes);

// Error Handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

//Default get
app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello Developer",
  });
});

//start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  //   console.log(require('crypto').randomBytes(64).toString('hex'))
});
