const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  Name: String,
  Email: String,
  UserId: { type: Schema.Types.ObjectId, ref: "User" },
});

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;
