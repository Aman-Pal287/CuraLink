const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  createOrUpdateProfile,
  getDashboard,
} = require("../controllers/patientController");

router.post("/profile", protect, createOrUpdateProfile);
router.get("/dashboard", protect, getDashboard);

module.exports = router;
