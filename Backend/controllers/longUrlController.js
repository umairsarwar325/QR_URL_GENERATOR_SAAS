const URL = require("../models/urlModel");

const longUrlController = async (req, res) => {
  const { shortId } = req.params;

  const urlFromDb = await URL.findOne({ shortUrl: shortId });
  if (urlFromDb) {
    res.redirect(urlFromDb.OriginalUrl);
  } else {
    res.json({ error: "URL not found" });
  }
};

module.exports = longUrlController;
