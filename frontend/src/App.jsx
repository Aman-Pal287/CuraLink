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

export default function App() {
  const [checking, setChecking] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Session check on app load (loader)
  useEffect(() => {
    const checkSession = async () => {
      try {
        // backend should expose /auth/me or similar to return current user if cookie present
        const res = await api.get("/auth/me");
        console.log(res);

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
      <Route path="/" element={<Login onAuth={(u) => setUser(u)} />} />
      <Route
        path="/register/*"
        element={<Register onAuth={(u) => setUser(u)} />}
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute user={user}>
            <Dashboard user={user} />
          </ProtectedRoute>
        }
      />
      <Route path="/publications" element={<PublicationsList />} />
      <Route path="/publications/new" element={<AddPublication />} />
      <Route path="/publications/:id" element={<PublicationDetails />} />
    </Routes>
  );
}
