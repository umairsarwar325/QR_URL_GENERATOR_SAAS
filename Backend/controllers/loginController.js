const bcrypt = require("bcryptjs");
const User = require("../models/usersModel");
const { Token } = require("../models");

const loginController = async function (req, res, next) {
  try {
    const { Email, Password } = req.body;
    // Find the user by email
    const user = await User.findOne({ Email });
    if (!user) {
      return res.json({
        authSuccess: false,
        message: "Invalid email or password",
      });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(Password, user.PasswordHash);
    if (!isMatch) {
      return res.json({
        authSuccess: false,
        message: "Invalid email or password",
      });
    }

    const newToken = await Token.findOneAndUpdate(
      { Name: "AUTH_TOKEN" },
      { $set: { Email: user.Email, UserId: user._id } },
      { new: true }
    );

    if (newToken) {
      res.json({
        authSuccess: true,
        message: "Login successful",
      });
    }
  } catch (error) {
    res.status(500).json({
      authSuccess: false,
      message: "Internal server error",
    });
  }
};

module.exports = loginController;
