const mongoose = require("mongoose");

const expertSchema = new mongoose.Schema({
  name: String,
  specialties: [String],
  contactEmail: String,
  affiliation: String,
  activeUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // if user exists
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Expert", expertSchema);
