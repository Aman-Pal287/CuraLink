const Publication = require("../models/Publication");
const { generateAISummary, extractTags } = require("../services/ai.service");
// Create Publication
exports.createPublication = async (req, res) => {
  try {
    const { title, authors, source, link, abstract } = req.body;

    const aiSummary = await generateAISummary(abstract);
    const tags = await extractTags(abstract);

    const pub = new Publication({
      title,
      authors,
      source,
      link,
      abstract,
      aiSummary,
      tags,
    });

    await pub.save();
    res.json(pub);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get All Publications
exports.getPublications = async (req, res) => {
  try {
    const publications = await Publication.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: publications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Single Publication by ID
exports.getPublicationById = async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);
    if (!publication) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    res.status(200).json({ success: true, data: publication });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Publication
exports.updatePublication = async (req, res) => {
  try {
    const publication = await Publication.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!publication) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.status(200).json({
      success: true,
      message: "Publication updated",
      data: publication,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Publication
exports.deletePublication = async (req, res) => {
  try {
    const publication = await Publication.findByIdAndDelete(req.params.id);

    if (!publication) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.status(200).json({ success: true, message: "Publication deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
