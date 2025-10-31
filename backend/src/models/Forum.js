const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  content: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isByPatient: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  replies: [
    {
      content: String,
      createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

const forumSchema = new mongoose.Schema({
  title: String,
  category: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  posts: [postSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Forum", forumSchema);
