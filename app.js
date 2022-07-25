require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const { DB_USER, DB_PASSWORD, DB_NAME } = process.env;

mongoose.connect(
  `mongodb+srv://${DB_USER}:${DB_PASSWORD}@mflix.mk7jy.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
);

const port = process.env.PORT || process.env.APP_PORT;

app.use("/uploads", express.static("uploads"));

const userRoutes = require("./routes/users");
const buildingRoutes = require("./routes/buildings");
const unitRoutes = require("./routes/units");

app.use("/api/users", userRoutes);
app.use("/api/buildings", buildingRoutes);
app.use("/api/units", unitRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
