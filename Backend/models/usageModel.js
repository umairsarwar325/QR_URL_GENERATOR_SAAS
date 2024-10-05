const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usageSchema = new Schema({
  UserID: { type: Schema.Types.ObjectId, ref: "User", required: true },
  SubscriptionID: {
    type: Schema.Types.ObjectId,
    ref: "Subscription",
  },
  QRCodeCount: { type: Number, required: true },
  URLCount: { type: Number, required: true },
  Month: { type: String },
  CreatedAt: { type: Date, default: Date.now },
  UpdatedAt: { type: Date, default: Date.now },
});

const Usage = mongoose.model("Usage", usageSchema);

module.exports = Usage;
