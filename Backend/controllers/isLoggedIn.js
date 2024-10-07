const jwt = require("jsonwebtoken");
const User = require("../models/usersModel");
const keys = require("../config/keys");
const { Token } = require("../models");

const isLoggedIn = async (req, res, next) => {
  try {
    const token = await Token.findOne({ Name: "AUTH_TOKEN" });
    const user = await User.findOne({ _id: token.UserId });
    if (token && user) {
      req.user = user;
      next();
    } else {
      return res.json({
        authFailure: true,
        message: "You are not logged in. Log in to continue",
      });
    }
  } catch (err) {
    res.json({
      authFailure: true,
      message: "Internel server error",
    });
  }
};

module.exports = isLoggedIn;
