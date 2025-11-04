import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";

export default function TrialDetails() {
  const { id } = useParams();
  const [trial, setTrial] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrial = async () => {
      try {
        const res = await api.get(`/trials/${id}`);
        setTrial(res.data);
      } catch (error) {
        console.error("Error fetching trial:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrial();
  }, [id]);

  if (loading)
    return <div className="p-6 text-center">Loading Trial Details...</div>;
  if (!trial) return <div className="p-6 text-center">Trial not found</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">{trial.title}</h1>
      <p className="text-gray-700">{trial.description}</p>

      <div className="space-y-2 text-gray-600">
        <p>
          <strong>Condition:</strong> {trial.condition}
        </p>
        <p>
          <strong>Category:</strong> {trial.category}
        </p>
        <p>
          <strong>Age Range:</strong> {trial.ageRange}
        </p>
        <p>
          <strong>Gender:</strong> {trial.gender}
        </p>
        <p>
          <strong>Location:</strong> {trial.location}
        </p>
        <p>
          <strong>Phase:</strong> {trial.phase}
        </p>
        <p>
          <strong>Status:</strong> {trial.status}
        </p>
      </div>
    </div>
  );
}
