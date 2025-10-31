const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  createOrUpdate,
  getDashboard,
} = require("../controllers/researcherController");

router.post("/profile", protect, createOrUpdate);
router.get("/dashboard", protect, getDashboard);

module.exports = router;
