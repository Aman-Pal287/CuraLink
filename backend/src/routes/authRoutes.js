const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, (req, res) => {
  // req.user exists from protect middleware
  res.json({ user: { id: req.user.id, role: req.user.role } });
});

module.exports = router;
