const Publication = require("../models/Publication");

// Create Publication
exports.createPublication = async (req, res) => {
  try {
    const { title, authors, source, link, abstract, aiSummary, tags } =
      req.body;

    const publication = await Publication.create({
      title,
      authors,
      source,
      link,
      abstract,
      aiSummary: aiSummary || null,
      tags,
    });

    res.status(201).json({
      success: true,
      message: "Publication added successfully",
      data: publication,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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
