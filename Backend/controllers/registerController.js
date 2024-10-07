const bcrypt = require("bcryptjs");
const User = require("../models/usersModel");
const Plan = require("../models/planModel");
const Subscription = require("../models/subscriptionModel");
const Usage = require("../models/usageModel");

const registerController = async function (req, res, next) {
  try {
    const { Username, Email, Password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ Email });
    if (existingUser) {
      return res.json({
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
      const intialPlan = await Plan.findOne({ PlanName: "BASIC" });
      if (intialPlan) {
        const intialSubscription = await Subscription.create({
          UserID: newUser._id,
          PlanID: intialPlan._id,
          Status: "active",
        });
        const intialUsage = await Usage.create({
          UserID: newUser._id,
          SubscriptionID: intialSubscription._id,
          QRCodeCount: 0,
          URLCount: 0,
        });
        newUser.PlanID = intialPlan._id;
        await newUser.save();
        if (intialSubscription && intialUsage) {
          return res.json({
            authSuccess: true,
            message: "User registered successfully. Login to continue",
          });
        } else {
          return res.json({
            authSuccess: false,
            message: "Can not register, try again",
          });
        }
      }
    } else {
      return res.json({
        authSuccess: false,
        message: "Can not register, try again",
      });
    }
  } catch (error) {
    return res.status(500).json({
      authSuccess: false,
      message: "Internal server error",
    });
  }
};

module.exports = registerController;
