import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard";
import Loader from "./components/Loader";
import ProtectedRoute from "./components/ProtectedRoute";
import api from "./api/api";
import PublicationsList from "./pages/Publications/PublicationsList";
import PublicationDetails from "./pages/Publications/PublicationDetails";
import AddPublication from "./pages/Publications/AddPublication";
import TrialsList from "./pages/Trials/TrialsList";
import TrialDetails from "./pages/Trials/TrialDetails";
import ExpertsList from "./pages/Experts/ExpertsList";
import ExpertProfile from "./pages/Experts/ExpertProfile";
import Home from "./pages/Home";
import DashboardLayout from "./layouts/DashboardLayout";

export default function App() {
  const [checking, setChecking] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.user || res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setChecking(false);
      }
    };
    checkSession();
  }, []);

  if (checking) return <Loader message="Checking session..." />;

  return (
    <Routes>
      {/* ✅ Base URL = Home */}
      <Route path="/" element={<Home />} />

      {/* Public Auth Routes */}
      <Route path="/login" element={<Login onAuth={(u) => setUser(u)} />} />
      <Route
        path="/register"
        element={<Register onAuth={(u) => setUser(u)} />}
      />

      {/* Protected Layout for App */}
      <Route
        element={
          <ProtectedRoute user={user}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route path="/publications" element={<PublicationsList />} />
        <Route path="/publications/new" element={<AddPublication />} />
        <Route path="/publications/:id" element={<PublicationDetails />} />
        <Route path="/trials" element={<TrialsList />} />
        <Route path="/trials/:id" element={<TrialDetails />} />
        <Route path="/experts" element={<ExpertsList />} />
        <Route path="/experts/:id" element={<ExpertProfile />} />
      </Route>

      {/* 404 Fallback */}
      <Route path="*" element={<h1 className="p-6">404 | Page Not Found</h1>} />
    </Routes>
  );
}
