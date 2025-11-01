import React from "react";

const PublicationCard = ({ pub }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow border">
      <h3 className="text-lg font-semibold mb-1">{pub.title}</h3>
      <div className="text-xs text-slate-500 mb-2">
        {(pub.authors || []).join(", ")} • {pub.source}
      </div>
      {pub.aiSummary ? (
        <p className="text-sm text-slate-700 line-clamp-4">{pub.aiSummary}</p>
      ) : (
        <p className="text-sm text-slate-500 line-clamp-2">{pub.abstract}</p>
      )}
      <div className="mt-3 flex gap-2 flex-wrap">
        {(pub.tags || []).map((t, i) => (
          <span key={i} className="text-xs px-2 py-1 bg-slate-100 rounded">
            {t}
          </span>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2">
        {pub.link && (
          <a
            className="text-sm text-blue-600"
            href={pub.link}
            target="_blank"
            rel="noreferrer"
          >
            Open
          </a>
        )}
      </div>
    </div>
  );
};

export default PublicationCard;
