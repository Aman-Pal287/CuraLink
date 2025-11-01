import React from "react";

const ExpertCard = () => {
  return (
    <div className="bg-white rounded-lg p-4 shadow border">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-md font-semibold">{expert.name}</h3>
          <div className="text-sm text-slate-500">
            {expert.affiliation || expert.hospital}
          </div>
        </div>
      </div>
      <div className="mt-3">
        {(expert.specialties || []).slice(0, 5).map((s, i) => (
          <span key={i} className="text-xs px-2 py-1 bg-slate-100 rounded mr-2">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ExpertCard;
