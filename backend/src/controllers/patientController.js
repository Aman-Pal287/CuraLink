const PatientProfile = require("../models/PatientProfile");
const User = require("../models/User");
const { extractTags } = require("../services/ai.service");

exports.createOrUpdateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { rawInput, location } = req.body;

    // AI Tag Extraction from patient input
    const conditions = await extractTags(rawInput);

    let profile = await PatientProfile.findOne({ userId });

    if (profile) {
      profile.rawInput = rawInput || profile.rawInput;
      profile.location = location || profile.location;
      if (conditions.length > 0) profile.conditions = conditions;
      await profile.save();
    } else {
      profile = new PatientProfile({ userId, rawInput, location, conditions });
      await profile.save();
    }

    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await PatientProfile.findOne({ userId });
    // For MVP: simple mock - return trials/publications/experts by tags (if any)
    const tags = (profile && profile.conditions) || [];
    // Basic search
    const Trial = require("../models/Trial");
    const Publication = require("../models/Publication");
    const Expert = require("../models/Expert");

    const trials = tags.length
      ? await Trial.find({ tags: { $in: tags } }).limit(10)
      : await Trial.find().limit(10);
    const pubs = tags.length
      ? await Publication.find({ tags: { $in: tags } }).limit(10)
      : await Publication.find().limit(10);
    const experts = tags.length
      ? await Expert.find({ specialties: { $in: tags } }).limit(10)
      : await Expert.find().limit(10);

    res.json({ trials, publications: pubs, experts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
