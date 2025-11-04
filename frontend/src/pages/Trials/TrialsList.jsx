import { useEffect, useState } from "react";
import api from "../../api/api";
import { Link } from "react-router-dom";

export default function TrialsList() {
  const [trials, setTrials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrials = async () => {
      try {
        const res = await api.get("/trials");
        setTrials(res.data);
      } catch (error) {
        console.error("Error fetching trials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrials();
  }, []);

  if (loading) return <div className="p-6 text-center">Loading Trials...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Clinical Trials</h1>

      {trials.length === 0 ? (
        <p className="text-gray-600">No trials available right now.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {trials.map((trial) => (
            <div
              key={trial._id}
              className="border rounded-lg p-4 shadow-sm space-y-3"
            >
              <h2 className="text-xl font-medium">{trial.title}</h2>
              <p className="text-gray-600">
                {trial.description?.slice(0, 120)}...
              </p>
              <p className="text-sm text-gray-500">
                <strong>Phase:</strong> {trial.phase} &nbsp;|&nbsp;
                <strong>Status:</strong> {trial.status}
              </p>
              <Link
                to={`/trials/${trial._id}`}
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
