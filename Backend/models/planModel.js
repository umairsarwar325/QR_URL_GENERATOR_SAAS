const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const planSchema = new Schema({
  PlanName: { type: String, required: true },
  Price: { type: Number, required: true },
  QRCodeLimit: { type: Number, required: true },
  URLLimit: { type: Number, required: true },
  CreatedAt: { type: Date, default: Date.now },
  UpdatedAt: { type: Date, default: Date.now },
});

const Plan = mongoose.model("Plan", planSchema);

module.exports = Plan;
