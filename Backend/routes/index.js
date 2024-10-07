var express = require("express");
const { Token } = require("../models");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("Listening on port:3000");
});
router.get("/logout", async function (req, res) {
  try {
    const clearToken = await Token.findOneAndUpdate(
      { Name: "AUTH_TOKEN" },
      { $set: { Email: "", UserId: null } },
      { new: true }
    );
    if (clearToken) {
      return res.json({
        logoutSuccess: true,
        message: "Logged out",
      });
    } else {
      return res.json({
        logoutSuccess: false,
        message: "Can not log out",
      });
    }
  } catch (error) {
    return res.json({
      logoutSuccess: false,
      message: "Can not log out",
    });
  }
});

module.exports = router;
