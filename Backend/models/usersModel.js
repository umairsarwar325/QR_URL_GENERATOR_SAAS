const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  Username: String,
  Email: String,
  PasswordHash: String,
  PlanID: { type: Schema.Types.ObjectId, ref: "Plan" },
  SubscriptionID: {
    type: Schema.Types.ObjectId,
    ref: "Subscription",
  },
  QRCodes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  Urls: [{ type: Schema.Types.ObjectId, ref: "URL" }],
  CreatedAt: { type: Date, default: Date.now },
  UpdatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
