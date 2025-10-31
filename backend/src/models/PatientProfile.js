const mongoose = require("mongoose");

const patientProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rawInput: { type: String },
  conditions: [{ type: String }], // extracted tags
  location: { type: String },
  favorites: [{ type: mongoose.Schema.Types.ObjectId }], // generic refs (store as objects with type in real app)
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("PatientProfile", patientProfileSchema);
