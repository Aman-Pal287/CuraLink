const mongoose = require("mongoose");

const pubSchema = new mongoose.Schema({
  title: String,
  authors: [String],
  source: String,
  link: String,
  abstract: String,
  aiSummary: String,
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Publication", pubSchema);
