import React from "react";

export default function Loader({ message = "Loading..." }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block w-12 h-12 border-4 border-t-primary rounded-full animate-spin border-gray-200"></div>
        <p className="mt-4 text-slate-600">{message}</p>
      </div>
    </div>
  );
}
