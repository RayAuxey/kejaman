const User = require("../models/user");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

    const token = jwt.sign(
      {
        email,
        first_name: user.firstName,
        last_name: user.lastName,
        id: user._id,
      },
      process.env.JWT_SECRET
    );
    res.status(200).json({
      success: true,
      message: `Suceessfully logged in as ${email}`,
      // token: Math.floor(Math.random() * (99999 - 10000) + 10000),
      token,
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
  listUsers: async (req, res) => {
    try {
      const users = await User.find({}).select("-password").exec();
      res.json({
        success: true,
        results: users,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },
  editUser: async (req, res) => {
    const { id } = req.user;
    const { first_name, last_name, password, email } = req.body;

    let editedUser = {};

    if (first_name) {
      editedUser.firstName = first_name;
    }
    if (last_name) {
      editedUser.lastName = last_name;
    }

    if (email) {
      editedUser.email = email;
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      editedUser.password = await bcrypt.hash(password, salt);
    }

    try {
      await User.updateOne({ _id: id }, editedUser).exec();
      res.send("Updated the user");
    } catch (error) {
      res.status(500).send("Server Error");
    }
  },
};
