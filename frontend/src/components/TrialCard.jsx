import React from "react";

const TrialCard = ({ trial }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 border">
      <h3 className="text-lg font-semibold">{trial.title}</h3>
      {trial.aiSummary && (
        <p className="mt-2 text-sm text-slate-600 line-clamp-3">
          {trial.aiSummary}
        </p>
      )}
      <div className="mt-3 text-sm text-slate-500">
        <span className="mr-2">Phase: {trial.phase || "N/A"}</span>
        <span className="mr-2">Status: {trial.status || "N/A"}</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {(trial.tags || []).slice(0, 5).map((t, i) => (
          <span key={i} className="text-xs px-2 py-1 bg-slate-100 rounded">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TrialCard;
