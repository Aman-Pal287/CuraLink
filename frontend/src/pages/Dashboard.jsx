import { useEffect, useState } from "react";
import api from "../api/api";

export default function Dashboard({ user }) {
  const role = user?.role || "patient"; // default patient
  return role === "researcher" ? <ResearcherDash /> : <PatientDash />;
}

/* -------- PATIENT DASHBOARD -------- */
function PatientDash() {
  const [data, setData] = useState({
    trials: [],
    publications: [],
    experts: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/patient/dashboard", {
          withCredentials: true,
        });
        setData(res.data || {});
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="p-6">Loading dashboard…</div>;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-semibold">Your Personalized Dashboard</h1>

      <Section title="Recommended Trials">
        <CardList items={data.trials} type="trial" />
      </Section>

      <Section title="Publications for you">
        <CardList items={data.publications} type="pub" />
      </Section>

      <Section title="Experts you may contact">
        <CardList items={data.experts} type="expert" />
      </Section>
    </div>
  );
}

/* -------- RESEARCHER DASHBOARD -------- */
function ResearcherDash() {
  const [pubs, setPubs] = useState([]);
  const [trials, setTrials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [p, t] = await Promise.all([
          api.get("/publications"),
          api.get("/trials"),
        ]);
        setPubs(p.data.data || p.data || []);
        setTrials(t.data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="p-6">Loading dashboard…</div>;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-semibold">Researcher Workspace</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Stat title="Publications" value={pubs.length} />
        <Stat title="Trials" value={trials.length} />
        <Stat title="Pending Questions" value={0} />
      </div>

      <Section title="Recent Publications">
        <MiniList items={pubs.slice(0, 6)} primaryKey="title" subKey="source" />
      </Section>

      <Section title="Active Trials">
        <MiniList
          items={trials.slice(0, 6)}
          primaryKey="title"
          subKey="status"
        />
      </Section>
    </div>
  );
}

/* -------- small building blocks -------- */
function Section({ title, children }) {
  return (
    <section>
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      {children}
    </section>
  );
}
function CardList({ items, type }) {
  if (!items?.length) return <div className="text-slate-500">Nothing yet.</div>;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((it) => (
        <div key={it._id} className="bg-white border rounded p-4 shadow-sm">
          <div className="font-semibold">{it.title || it.name}</div>
          <div className="text-sm text-slate-600 mt-1 line-clamp-3">
            {it.aiSummary || it.description || it.bio || "—"}
          </div>
        </div>
      ))}
    </div>
  );
}
function Stat({ title, value }) {
  return (
    <div className="bg-white border rounded p-4 shadow-sm">
      <div className="text-sm text-slate-500">{title}</div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  );
}
function MiniList({ items, primaryKey, subKey }) {
  if (!items?.length) return <div className="text-slate-500">No data yet.</div>;
  return (
    <div className="bg-white border rounded p-2">
      {items.map((it) => (
        <div key={it._id} className="px-3 py-2 border-b last:border-0">
          <div className="font-medium">{it[primaryKey]}</div>
          <div className="text-xs text-slate-500">{it[subKey]}</div>
        </div>
      ))}
    </div>
  );
}
