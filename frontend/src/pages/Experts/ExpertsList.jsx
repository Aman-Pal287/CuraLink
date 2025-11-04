import { useEffect, useState } from "react";
import api from "../../api/api";

export default function ExpertsList() {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const res = await api.get("/experts");
        setExperts(res.data);
      } catch (error) {
        console.error("Error fetching experts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperts();
  }, []);

  if (loading) return <div className="p-6 text-center">Loading Experts...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Medical Experts</h1>

      {experts.length === 0 ? (
        <p className="text-gray-600">No experts available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {experts.map((exp) => (
            <div
              key={exp._id}
              className="border rounded-lg p-4 shadow-sm space-y-3"
            >
              <h2 className="text-xl font-medium">{exp.name}</h2>
              <p className="text-gray-600">{exp.specialization}</p>

              {/* Tags */}
              {exp.tags && exp.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-sm bg-gray-200 px-2 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Rating */}
              <p className="text-sm text-gray-500">
                <strong>Experience:</strong> {exp.experience} yrs
              </p>

              <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
                View Profile
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
