import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDashboard,
  fetchPublications,
  fetchTrials,
  fetchExperts,
} from "./dashboardSlice";
import TrialCard from "../../components/TrialCard";
import PublicationCard from "../../components/PublicationCard";
import ExpertCard from "../../components/ExpertCard";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading, error, trials, publications, experts, patientDashboard } =
    useSelector((s) => s.dashboard);

  useEffect(() => {
    // If you want protected patient dashboard:
    dispatch(fetchDashboard());
    // Or public fetch:
    // dispatch(fetchPublications());
    // dispatch(fetchTrials());
    // dispatch(fetchExperts());
  }, [dispatch]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error)
    return (
      <div className="p-8 text-red-600">Error: {error.message || error}</div>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Dashboard</h1>

      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recommended Clinical Trials</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trials && trials.length ? (
            trials.map((t) => <TrialCard key={t._id || t.id} trial={t} />)
          ) : (
            <div>No trials found.</div>
          )}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Publications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {publications && publications.length ? (
            publications.map((p) => (
              <PublicationCard key={p._id || p.id} pub={p} />
            ))
          ) : (
            <div>No publications.</div>
          )}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Health Experts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {experts && experts.length ? (
            experts.map((e) => <ExpertCard key={e._id || e.id} expert={e} />)
          ) : (
            <div>No experts.</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
