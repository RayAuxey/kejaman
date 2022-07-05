const UserModel = require("../models/user");

const { users } = require("../db.json");

const crypto = require("crypto");

module.exports = {
  userLogin: (req, res) => {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(403).json({
        success: false,
        message: "You should provide email and password",
      });
    }

    const user = users.find((user) => user.email === email);

    if (!user) {
      return res.status(404).json({
        success: "false",
        message: "User not found",
      });
    }

    if (user && password !== user.password) {
      return res.status(403).json({
        success: false,
        message: "Invalid Password",
      });
    }

    console.log("Logging in..");
    res.status(200).json({
      success: true,
      message: `Suceessfully logged in as ${email}`,
      // token: Math.floor(Math.random() * (99999 - 10000) + 10000),
      token: crypto.randomBytes(10).toString("hex"),
    });
  },
  userSignup: (req, res) => {
    const { email, name, password } = req.body;

    if (!(email && name && password)) {
      return res.status(400).json({
        success: false,
        message: "You should provide email, name and password",
      });
    }
    const user = users.find((user) => user.email === email);

    if (user) {
      return res.status(400).json({
        success: false,
        message: "There's a user with that email",
      });
    }

    const newUser = new UserModel(email, name, password);

    try {
      newUser.saveToDb();
      return res.status(201).json({
        success: true,
        message: "User created successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  },
  listUsers: (req, res) => {
    res.json(
      users.map((user) => ({
        email: user.email,
        name: user.name,
      }))
    );
  },
};
