import { useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function ResearcherOnboarding() {
  const [affiliation, setAffiliation] = useState("");
  const [specialties, setSpecialties] = useState("");
  const [researchInterests, setResearchInterests] = useState("");
  const [orcid, setOrcid] = useState("");
  const [availability, setAvailability] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const body = {
        affiliation,
        specialties: specialties
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        researchInterests: researchInterests
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        orcid,
        availability,
      };
      // assuming route: POST /api/researcher/profile
      await api.post("/researcher/profile", body, { withCredentials: true });
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to save researcher profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold">Researcher Profile</h1>
      <p className="text-slate-600 mt-1">
        Help us route the right trials, collaborators, and questions to you.
      </p>

      <form
        onSubmit={submit}
        className="bg-white border rounded-lg p-4 mt-4 space-y-4"
      >
        <div>
          <label className="text-sm block mb-1">
            Affiliation / Institution
          </label>
          <input
            className="w-full border rounded px-3 py-2"
            value={affiliation}
            onChange={(e) => setAffiliation(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm block mb-1">
            Specialties (comma separated)
          </label>
          <input
            className="w-full border rounded px-3 py-2"
            value={specialties}
            onChange={(e) => setSpecialties(e.target.value)}
            placeholder="Oncology, Neurology…"
          />
        </div>

        <div>
          <label className="text-sm block mb-1">
            Research Interests (comma separated)
          </label>
          <input
            className="w-full border rounded px-3 py-2"
            value={researchInterests}
            onChange={(e) => setResearchInterests(e.target.value)}
            placeholder="Immunotherapy, Clinical AI…"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm block mb-1">ORCID (optional)</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={orcid}
              onChange={(e) => setOrcid(e.target.value)}
              placeholder="0000-0002-1825-0097"
            />
          </div>
          <div className="flex items-center gap-2 mt-6">
            <input
              id="avail"
              type="checkbox"
              checked={availability}
              onChange={(e) => setAvailability(e.target.checked)}
            />
            <label htmlFor="avail" className="text-sm">
              Available for meetings
            </label>
          </div>
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
