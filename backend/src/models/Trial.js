const mongoose = require("mongoose");

const trialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  phase: String,
  status: String, // recruiting, completed, etc
  location: String,
  contactEmail: String,
  description: String,
  criteria: String,
  aiSummary: String,
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Trial", trialSchema);
