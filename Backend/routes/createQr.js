const express = require("express");
const qrController = require("../controllers/createQrController");
const isLoggedIn = require("../controllers/isLoggedIn");
const router = express.Router();

router.post("/",isLoggedIn, qrController);

module.exports = router;
