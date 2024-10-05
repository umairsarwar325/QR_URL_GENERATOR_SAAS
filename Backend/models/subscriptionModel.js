const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
  UserID: { type: Schema.Types.ObjectId, ref: "User" },
  PlanID: { type: Schema.Types.ObjectId, ref: "Plan" },
  StartDate: { type: Date },
  EndDate: { type: Date },
  Status: { type: String, required: true },
  CreatedAt: { type: Date, default: Date.now },
  UpdatedAt: { type: Date, default: Date.now },
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

module.exports = Subscription;
