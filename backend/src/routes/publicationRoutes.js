const express = require("express");
const {
  createPublication,
  getPublications,
  getPublicationById,
  updatePublication,
  deletePublication,
} = require("../controllers/publicationController");

const router = express.Router();

router.post("/", createPublication);
router.get("/", getPublications);
router.get("/:id", getPublicationById);
router.put("/:id", updatePublication);
router.delete("/:id", deletePublication);

module.exports = router;
