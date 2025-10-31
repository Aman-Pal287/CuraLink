const mongoose = require("mongoose");

const researcherProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  affiliation: { type: String },
  specialties: [{ type: String }],
  researchInterests: [{ type: String }],
  orcid: { type: String },
  availability: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ResearcherProfile", researcherProfileSchema);
