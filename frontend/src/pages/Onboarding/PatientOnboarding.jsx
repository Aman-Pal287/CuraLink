import { useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function PatientOnboarding() {
  const [rawInput, setRawInput] = useState("");
  const [location, setLocation] = useState("");
  const [conditions, setConditions] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const body = {
        rawInput,
        location,
        conditions: conditions
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };
      await api.post("/patient/profile", body, { withCredentials: true });
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold">Tell us about your condition</h1>
      <p className="text-slate-600 mt-1">
        This helps us personalize trials, publications, and experts.
      </p>

      <form
        onSubmit={submit}
        className="bg-white border rounded-lg p-4 mt-4 space-y-4"
      >
        <div>
          <label className="text-sm block mb-1">
            Describe your condition (free text)
          </label>
          <textarea
            className="w-full border rounded px-3 py-2"
            rows="5"
            value={rawInput}
            onChange={(e) => setRawInput(e.target.value)}
            placeholder="e.g., I have brain cancer and recent headaches…"
          />
        </div>

        <div>
          <label className="text-sm block mb-1">
            Key conditions (comma separated)
          </label>
          <input
            className="w-full border rounded px-3 py-2"
            value={conditions}
            onChange={(e) => setConditions(e.target.value)}
            placeholder="e.g., glioma, brain cancer"
          />
        </div>

        <div>
          <label className="text-sm block mb-1">Location</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City, Country"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {loading ? "Saving..." : "Save & Continue"}
        </button>
      </form>
    </div>
  );
}
