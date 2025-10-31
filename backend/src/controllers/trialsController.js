const Trial = require("../models/Trial");

exports.listTrials = async (req, res) => {
  try {
    // support query params: q, status, location
    const { q, status, location } = req.query;
    const filter = {};
    if (q) filter.$text = { $search: q }; // need text index
    if (status) filter.status = status;
    if (location) filter.location = location;

    const trials = await Trial.find(filter).limit(50);
    res.json(trials);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.createTrial = async (req, res) => {
  try {
    const {
      title,
      phase,
      status,
      location,
      contactEmail,
      description,
      criteria,
      tags,
    } = req.body;
    const trial = new Trial({
      title,
      phase,
      status,
      location,
      contactEmail,
      description,
      criteria,
      tags,
    });
    await trial.save();
    res.json(trial);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
