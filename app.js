require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json());

const port = process.env.PORT || process.env.APP_PORT;

const userRoutes = require("./routes/users.js");

app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
