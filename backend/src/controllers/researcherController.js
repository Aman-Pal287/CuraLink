const ResearcherProfile = require("../models/ResearcherProfile");

exports.createOrUpdate = async (req, res) => {
  try {
    const userId = req.user.id;
    const { affiliation, specialties, researchInterests, orcid, availability } =
      req.body;
    let profile = await ResearcherProfile.findOne({ userId });
    if (profile) {
      profile.affiliation = affiliation || profile.affiliation;
      profile.specialties = specialties || profile.specialties;
      profile.researchInterests =
        researchInterests || profile.researchInterests;
      profile.orcid = orcid || profile.orcid;
      profile.availability =
        typeof availability === "boolean" ? availability : profile.availability;
      await profile.save();
    } else {
      profile = new ResearcherProfile({
        userId,
        affiliation,
        specialties,
        researchInterests,
        orcid,
        availability,
      });
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
    const Researcher = require("../models/ResearcherProfile");
    const Trial = require("../models/Trial");
    const Expert = require("../models/Expert");

    const profile = await Researcher.findOne({ userId });
    const tags =
      (profile && profile.specialties) ||
      (profile && profile.researchInterests) ||
      [];

    const trials = tags.length
      ? await Trial.find({ tags: { $in: tags } }).limit(10)
      : await Trial.find().limit(10);
    const collaborators = tags.length
      ? await Researcher.find({ specialties: { $in: tags } }).limit(10)
      : await Researcher.find().limit(10);

    res.json({ trials, collaborators });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
