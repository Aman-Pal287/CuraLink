require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const patientRoutes = require("./routes/patientRoutes");
const researcherRoutes = require("./routes/researcherRoutes");
const trialRoutes = require("./routes/trialRoutes");
const cookieParser = require("cookie-parser");
const aiRoutes = require("./routes/aiRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/researcher", researcherRoutes);
app.use("/api/trials", trialRoutes);
// app.use("/api/ai", aiRoutes);

module.exports = app;
