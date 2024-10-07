const { customAlphabet } = require("nanoid");
const User = require("../models/usersModel");
const Plan = require("../models/planModel");
const Usage = require("../models/usageModel");
const URL = require("../models/urlModel");

// Function to generate a short URL
const nanoid = customAlphabet(
  "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  6
);

// Public domain for the short URLs
const publicDomain = "https://localhost:3000";

const shortenLinkController = async (req, res) => {
  try {
    const { longUrl } = req.body;
    if (!longUrl) {
      return res.json({
        urlSuccess: false,
        error: "Long URL is required",
      });
    }

    const user = await User.findOne({ _id: req.user._id });
    const usage = await Usage.findOne({ UserID: user._id });
    const plan = await Plan.findOne({ _id: user.PlanID });

    if (usage.URLCount >= plan.URLLimit) {
      return res.json({
        urlSuccess: false,
        message: "URL limit exceeded. Please upgrade your subscription plan",
      });
    }
    const shortId = nanoid();
    if (user && usage && plan) {
      const newUrl = await URL.create({
        UserID: user._id,
        shortUrl: shortId,
        OriginalUrl: longUrl,
      });
      if (newUrl) {
        user.Urls.push(newUrl._id);
        usage.URLCount += 1;
        await user.save();
        await usage.save();
        return res.json({
          urlSuccess: true,
          shortUrl: `${publicDomain}/${shortId}`,
          shortId: shortId,
          message: "Short url genrated successfully",
        });
      }
    } else {
      return res.json({
        urlSuccess: false,
        message: "Failed to generate Short URL",
      });
    }
  } catch (error) {
    res.json({
      qrSuccess: false,
      message: "Internel server error",
    });
  }
};

module.exports = shortenLinkController;
