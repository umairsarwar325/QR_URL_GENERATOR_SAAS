const express = require("express");
const qrController = require("../controllers/createQrController");
const isLoggedIn = require("../controllers/isLoggedIn");
const router = express.Router();

router.post("/create", isLoggedIn, qrController);

module.exports = router;
