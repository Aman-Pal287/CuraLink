const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const { listTrials, createTrial } = require("../controllers/trialsController");

router.get("/", listTrials);
router.post("/", protect, createTrial); // only auth users can create in MVP

module.exports = router;
