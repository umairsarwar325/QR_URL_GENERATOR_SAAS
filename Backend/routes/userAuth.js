const express = require("express");
const loginController = require("../controllers/loginController");
const registerController = require("../controllers/registerController");
const { Plan } = require("../models");
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);

router.get("/cp", async (req, res) => {
  const plan1 = await Plan.create({
    PlanName: "BASIC",
    Price: 0,
    QRCodeLimit: 10,
    URLLimit: 10,
  });
  const plan2 = await Plan.create({
    PlanName: "PRO",
    Price: 500,
    QRCodeLimit: 150,
    URLLimit: 150,
  });
  const plan3 = await Plan.create({
    PlanName: "PRO-TEAM",
    Price: 700,
    QRCodeLimit: 500,
    URLLimit: 500,
  });
  const plan4 = await Plan.create({
    PlanName: "PRO-ENTERPRISE",
    Price: 1700,
    QRCodeLimit: 1500,
    URLLimit: 1500,
  });
  res.send("created 4 plans");
});

module.exports = router;
