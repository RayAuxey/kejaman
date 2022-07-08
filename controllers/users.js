const User = require("../models/user");

const crypto = require("crypto");
const bcrypt = require("bcryptjs");

module.exports = {
  userLogin: async (req, res) => {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(403).json({
        success: false,
        message: "You should provide email and password",
      });
    }

    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(404).json({
        success: "false",
        message: "User not found",
      });
    }

    if (!(await bcrypt.compare(password, user.password))) {
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
  userSignup: async (req, res) => {
    const { email, first_name, last_name, password } = req.body;
    if (!(email && first_name && last_name && password)) {
      return res.status(400).json({
        success: false,
        message: "You should provide email, name and password",
      });
    }

    const user = await User.findOne({
      email,
    }).exec();

    if (user) {
      return res.status(400).json({
        success: false,
        message: "There's a user with that email",
      });
    }

    const newUser = new User({
      firstName: first_name,
      lastName: last_name,
      password,
      email,
    });

    try {
      const savedDoc = await newUser.save();
      return res.status(201).json({
        success: true,
        message: "User created successfully",
        doc: savedDoc,
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
