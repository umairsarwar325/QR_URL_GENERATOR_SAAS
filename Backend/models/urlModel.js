const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const urlSchema = new Schema({
  UserID: { type: Schema.Types.ObjectId, ref: "User", required: true },
  OriginalUrl: { type: String, required: true },
  CreatedAt: { type: Date, default: Date.now },
  UpdatedAt: { type: Date, default: Date.now },
});

const URL = mongoose.model("URL", urlSchema);

module.exports = URL;
