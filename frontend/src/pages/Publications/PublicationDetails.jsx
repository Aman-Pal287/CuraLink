import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";

export default function PublicationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pub, setPub] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/publications/${id}`);
        setPub(res.data.data || res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("Delete this publication?")) return;
    try {
      await api.delete(`/publications/${id}`);
      navigate("/publications");
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (!pub) return <div className="p-8">Not found</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold">{pub.title}</h1>
        <div className="text-sm text-slate-500 mb-4">
          {(pub.authors || []).join(", ")} • {pub.source}
        </div>

        <section className="mb-4">
          <h3 className="font-semibold mb-2">AI Summary</h3>
          <p className="text-slate-700">
            {pub.aiSummary || "No AI summary available"}
          </p>
        </section>

        <section className="mb-4">
          <h3 className="font-semibold mb-2">Abstract</h3>
          <p className="text-slate-700">{pub.abstract}</p>
        </section>

        <section className="mb-4">
          <h3 className="font-semibold mb-2">Tags</h3>
          <div className="flex gap-2 flex-wrap">
            {(pub.tags || []).map((t, i) => (
              <span key={i} className="text-xs px-2 py-1 bg-slate-100 rounded">
                {t}
              </span>
            ))}
          </div>
        </section>

        <div className="mt-4 flex gap-3">
          {pub.link && (
            <a
              href={pub.link}
              target="_blank"
              rel="noreferrer"
              className="text-primary"
            >
              Open Source
            </a>
          )}
          <button
            onClick={() => navigate(`/publications/${id}/edit`)}
            className="px-3 py-1 border rounded"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-1 border rounded text-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
