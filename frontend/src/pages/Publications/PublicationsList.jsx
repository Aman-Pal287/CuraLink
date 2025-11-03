import React, { useEffect, useState } from "react";
import api from "../../api/api";
import PublicationCard from "../../components/PublicationCard";
import { Link } from "react-router-dom";

export default function PublicationsList() {
  const [publications, setPublications] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/publications");
        // backend returns { success:true, data: [...] } or array — handle both
        setPublications(res.data.data || res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = publications.filter((p) => {
    if (!q.trim()) return true;
    const s = q.toLowerCase();
    return (
      p.title?.toLowerCase().includes(s) ||
      (p.authors || []).join(" ").toLowerCase().includes(s) ||
      (p.tags || []).join(" ").toLowerCase().includes(s)
    );
  });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Publications</h1>
        <div className="flex items-center gap-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by title, author or tag"
            className="border px-3 py-2 rounded w-80"
          />
          <Link
            to="/publications/new"
            className="px-4 py-2 bg-primary text-white rounded"
          >
            Add Publication
          </Link>
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : filtered.length === 0 ? (
        <div>No publications found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <PublicationCard key={p._id || p.id} pub={p} />
          ))}
        </div>
      )}
    </div>
  );
}
