require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");
const Trial = require("../models/Trial");
const Publication = require("../models/Publication");
const Expert = require("../models/Expert");
const bcrypt = require("bcryptjs");

const MONGO_URI = process.env.MONGO_URI;

async function seed() {
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to DB for seeding");

  // clean
  await User.deleteMany({});
  await Trial.deleteMany({});
  await Publication.deleteMany({});
  await Expert.deleteMany({});

  // admin user
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash("password123", salt);
  const admin = await User.create({
    name: "Admin",
    email: "admin@curalink.test",
    password: hashed,
    role: "admin",
  });

  // trials
  await Trial.create([
    {
      title: "Phase II Immunotherapy Trial for Glioma",
      phase: "Phase II",
      status: "recruiting",
      location: "Bengaluru, India",
      contactEmail: "trial1@clinic.org",
      description: "A trial on immunotherapy for glioma patients",
      criteria: "Adults 18-65 with diagnosed glioma",
      tags: ["glioma", "brain cancer", "immunotherapy"],
    },
    {
      title: "Lung Cancer Targeted Therapy Study",
      phase: "Phase III",
      status: "completed",
      location: "New Delhi, India",
      contactEmail: "trial2@clinic.org",
      description: "Targeted therapy study in lung cancer",
      criteria: "NSCLC patients with EGFR mutation",
      tags: ["lung cancer", "immunotherapy"],
    },
  ]);

  // publications
  await Publication.create([
    {
      title: "Immunotherapy advances in brain tumors",
      authors: ["A. Gupta"],
      source: "Nature Medicine",
      link: "https://example.com",
      abstract: "Long abstract...",
      tags: ["glioma", "immunotherapy"],
    },
    {
      title: "Targeted therapies in lung cancer",
      authors: ["S. Rao"],
      source: "JAMA",
      link: "https://example.com",
      abstract: "Long abstract...",
      tags: ["lung cancer"],
    },
  ]);

  // experts
  await Expert.create([
    {
      name: "Dr. Priya Sharma",
      specialties: ["glioma", "neuro-oncology"],
      contactEmail: "priya@hospital.org",
      affiliation: "AIIMS",
    },
    {
      name: "Dr. Rajiv Menon",
      specialties: ["lung cancer", "medical oncology"],
      contactEmail: "rajiv@clinic.org",
      affiliation: "Apollo",
    },
  ]);

  console.log("Seeding done");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
