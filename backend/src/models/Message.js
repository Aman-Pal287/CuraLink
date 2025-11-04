// src/models/Message.js
const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  conversationId: { type: String, required: true }, // simple: "userId_expertId"
  fromUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  toUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: String,
  createdAt: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
});

module.exports = mongoose.model("Message", MessageSchema);
