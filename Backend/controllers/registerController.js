const bcrypt = require("bcryptjs");
const User = require("../models/usersModel");

const registerController = async function (req, res, next) {
  try {
    const { Username, Email, Password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ Email });
    if (existingUser) {
      return res.status(400).json({
        authSuccess: false,
        message: "Email already registered",
      });
    }

    // Hash the Password
    const salt = await bcrypt.genSalt(10);
    const PasswordHash = await bcrypt.hash(Password, salt);

    // Create a new user
    const newUser = await User.create({
      Username,
      Email,
      PasswordHash,
    });

    if (newUser) {
      res.status(201).json({
        authSuccess: true,
        message: "User registered successfully",
      });
    } else {
      res.status(201).json({
        authSuccess: false,
        message: "Can not register, try again",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      authSuccess: false,
      message: "Internal server error",
    });
  }
};

module.exports = registerController;
