// src/models/Expert.js
const mongoose = require("mongoose");

const ExpertSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // optional
  name: String,
  avatar: String,
  email: String,
  institution: String,
  location: String,
  specialization: String,
  bio: String,
  experience: { type: Number, default: 0 }, // years
  tags: [String],
  publications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Publication" }],
  trials: [{ type: mongoose.Schema.Types.ObjectId, ref: "Trial" }],
  aiSummary: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Expert", ExpertSchema);
