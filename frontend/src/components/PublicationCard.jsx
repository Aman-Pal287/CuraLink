import React from "react";
import { Link } from "react-router-dom";

export default function PublicationCard({ pub }) {
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
        <Link
          to={`/publications/${pub._id || pub.id}`}
          className="text-sm text-primary"
        >
          View Details
        </Link>
        {pub.link && (
          <a
            href={pub.link}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-slate-500"
          >
            Open
          </a>
        )}
      </div>
    </div>
  );
}
