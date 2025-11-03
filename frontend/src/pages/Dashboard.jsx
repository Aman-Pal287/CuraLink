import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    publications: 0,
    trials: 0,
    experts: 0,
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/patient/dashboard", {
          withCredentials: true,
        });
        setStats(res.data);
      } catch (error) {
        console.error("Dashboard Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading)
    return <div className="text-center p-8">Loading Dashboard...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">
        Welcome to MedLink Dashboard 👋
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold">{stats.publications}</h2>
          <p className="text-gray-500">Publications</p>
        </div>

        <div className="p-5 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold">{stats.trials}</h2>
          <p className="text-gray-500">Clinical Trials</p>
        </div>

        <div className="p-5 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold">{stats.experts}</h2>
          <p className="text-gray-500">AI Matched Experts</p>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-medium">Quick Actions</h2>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/publications"
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            View Publications
          </Link>

          <Link
            to="/trials"
            className="px-4 py-2 bg-green-600 text-white rounded-md"
          >
            Explore Trials
          </Link>

          <Link
            to="/experts"
            className="px-4 py-2 bg-purple-600 text-white rounded-md"
          >
            Find Experts
          </Link>
        </div>
      </div>
    </div>
  );
}
