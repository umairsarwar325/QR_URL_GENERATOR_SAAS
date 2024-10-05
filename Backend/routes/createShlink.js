const express = require("express");
const shortenLinkController = require("../controllers/shortenLinkController");
const longUrlController = require("../controllers/longUrlController");
const router = express.Router();
const { customAlphabet } = require("nanoid");
const isLoggedIn = require("../controllers/isLoggedIn");

// Function to generate a short URL
const nanoid = customAlphabet(
  "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  6
);

// Public domain for the short URLs
const publicDomain = "https://localhost:3000";

router.post("/shorten", isLoggedIn, shortenLinkController);

router.get("/:shortId", isLoggedIn, longUrlController);

module.exports = router;
