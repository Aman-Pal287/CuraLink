// src/controllers/expertController.js
const Expert = require("../models/Expert");
const Appointment = require("../models/Appointment");
const Message = require("../models/Message");
const Review = require("../models/Review");
const { generateAISummary, extractTags } = require("../services/ai.service");

// Public: list experts
exports.listExperts = async (req, res) => {
  try {
    const experts = await Expert.find().limit(100);
    res.json(experts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Public: get by id (includes reviews + basic analytics)
exports.getExpert = async (req, res) => {
  try {
    const { id } = req.params;
    const expert = await Expert.findById(id)
      .populate("publications")
      .populate("trials");

    if (!expert) return res.status(404).json({ msg: "Not found" });

    // fetch reviews & analytics
    const reviews = await Review.find({ expertId: id })
      .sort({ createdAt: -1 })
      .limit(50);
    const avgRatingAgg = await Review.aggregate([
      { $match: { expertId: expert._id } },
      {
        $group: {
          _id: "$expertId",
          avgRating: { $avg: "$rating" },
          count: { $sum: 1 },
        },
      },
    ]);
    const avgRating = (avgRatingAgg[0] && avgRatingAgg[0].avgRating) || 0;
    const reviewCount = (avgRatingAgg[0] && avgRatingAgg[0].count) || 0;

    res.json({
      ...expert.toObject(),
      reviews,
      analytics: { avgRating, reviewCount },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Researcher/admin: create expert profile
exports.createExpert = async (req, res) => {
  try {
    const body = req.body;
    // optional auto-AI summary from bio
    let aiSummary = body.aiSummary;
    if (!aiSummary && body.bio) aiSummary = await generateAISummary(body.bio);

    const expert = await Expert.create({ ...body, aiSummary });
    res.status(201).json(expert);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Book appointment
exports.bookAppointment = async (req, res) => {
  try {
    // protect middleware should set req.user
    const userId = req.user?.id;
    const { expertId, name, contact, datetime, notes } = req.body;
    if (!userId) return res.status(401).json({ msg: "Login required" });

    const appt = await Appointment.create({
      expertId,
      userId,
      name,
      contact,
      datetime,
      notes,
      status: "requested",
    });

    // TODO: notify expert/admin by email (out of scope)
    res.status(201).json(appt);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Chat: send message
exports.sendMessage = async (req, res) => {
  try {
    const fromUserId = req.user?.id;
    const { toUserId, conversationId, text } = req.body;
    if (!fromUserId) return res.status(401).json({ msg: "Login required" });

    const convId = conversationId || [fromUserId, toUserId].sort().join("_");
    const msg = await Message.create({
      conversationId: convId,
      fromUserId,
      toUserId,
      text,
    });
    res.status(201).json(msg);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Chat: fetch messages for conversation
exports.getMessages = async (req, res) => {
  try {
    const { conversationId } = req.query;
    if (!conversationId)
      return res.status(400).json({ msg: "conversationId required" });
    const msgs = await Message.find({ conversationId }).sort({ createdAt: 1 });
    res.json(msgs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Post a review
exports.postReview = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { expertId, rating, comment } = req.body;
    if (!userId) return res.status(401).json({ msg: "Login required" });

    const review = await Review.create({ expertId, userId, rating, comment });
    res.status(201).json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Analytics: simple stats for expert (bookings count, avg rating)
exports.getExpertAnalytics = async (req, res) => {
  try {
    const { id } = req.params;
    const bookedCount = await Appointment.countDocuments({ expertId: id });
    const avgRatingAgg = await Review.aggregate([
      { $match: { expertId: mongoose.Types.ObjectId(id) } },
      { $group: { _id: null, avgRating: { $avg: "$rating" } } },
    ]);
    const avgRating = avgRatingAgg[0]?.avgRating || 0;
    res.json({ bookedCount, avgRating });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
