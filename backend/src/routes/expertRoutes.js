// src/routes/expertRoutes.js
const express = require("express");
const router = express.Router();
const expertController = require("../controllers/expertController");
const { protect } = require("../middlewares/authMiddleware");

// public
router.get("/", expertController.listExperts);
router.get("/:id", expertController.getExpert);

// protected actions
router.post("/", protect, expertController.createExpert); // researcher/admin
router.post("/appointments", protect, expertController.bookAppointment);
router.post("/messages", protect, expertController.sendMessage);
router.get("/messages", protect, expertController.getMessages);
router.post("/reviews", protect, expertController.postReview);
router.get("/:id/analytics", protect, expertController.getExpertAnalytics);

module.exports = router;
