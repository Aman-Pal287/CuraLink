import React from "react";
import { Link } from "react-router-dom";
import useFavorites from "../hooks/useFavorites";

export default function PublicationCard({ pub }) {
  const { toggle, isSaved } = useFavorites();
  const saved = isSaved("pubs", pub._id);

  return (
    <div className="bg-white rounded-lg p-4 shadow border">
      <h3 className="text-lg font-semibold mb-1">{pub.title}</h3>
      <div className="text-xs text-slate-500 mb-2">
        {(pub.authors || []).join(", ")} • {pub.source}
      </div>

      <p className="text-sm text-slate-700 line-clamp-4">
        {pub.aiSummary
          ? pub.aiSummary
          : pub.abstract
          ? pub.abstract
          : "No summary available"}
      </p>

      <div className="mt-3 flex gap-2 flex-wrap">
        {(pub.tags || []).slice(0, 6).map((t, i) => (
          <span key={i} className="text-xs px-2 py-1 bg-slate-100 rounded">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <Link to={`/publications/${pub._id}`} className="text-sm text-blue-600">
          View Details
        </Link>
        <button
          onClick={() => toggle("pubs", pub)}
          className={`text-sm px-3 py-1 rounded border ${
            saved
              ? "bg-blue-600 text-white border-blue-600"
              : "hover:bg-slate-50"
          }`}
        >
          {saved ? "Saved" : "Save"}
        </button>
      </div>
    </div>
  );
}
