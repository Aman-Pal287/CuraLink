import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 via-white to-white" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center text-xs font-semibold uppercase tracking-widest text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
              AI • Clinical • Research
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold leading-tight text-slate-900">
              Find the right{" "}
              <span className="text-blue-700">clinical trials</span>, decode
              research with <span className="text-blue-700">AI</span>, and{" "}
              connect with trusted{" "}
              <span className="text-blue-700">experts</span>.
            </h1>
            <p className="mt-4 text-slate-600 max-w-xl">
              MedLink AI simplifies medical discovery for patients and
              researchers. Search trials, skim AI summaries of publications, and
              reach verified experts — all in one clean workspace.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/register"
                className="px-5 py-3 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                I’m new — Get Started
              </Link>
              <Link
                to="/login"
                className="px-5 py-3 rounded border border-slate-300 hover:bg-slate-50"
              >
                I already have an account
              </Link>
              <Link
                to="/publications"
                className="px-5 py-3 rounded border border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                Explore research
              </Link>
            </div>

            {/* Trust row */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-500">
              {["NEJM", "JAMA", "Nature Medicine", "ClinicalTrials.gov"].map(
                (n) => (
                  <div
                    key={n}
                    className="px-3 py-2 rounded border bg-white text-center"
                  >
                    {n}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Illustration (inline SVGs, healthcare vibe) */}
          <div className="relative">
            <div className="absolute -inset-6 bg-blue-100/40 blur-3xl rounded-[40px]" />
            <div className="relative bg-white rounded-2xl border shadow-sm p-6">
              <HeroIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid md:grid-cols-3 gap-6">
        <ValueCard
          title="AI summaries that make sense"
          desc="Upload abstracts or paste links — get clean, reliable summaries in seconds. No medical advice, just facts."
          icon={<IconSpark />}
        />
        <ValueCard
          title="Clinical trials, simplified"
          desc="Search by condition, phase, or location. Filter recruiting trials and contact coordinators instantly."
          icon={<IconTrial />}
        />
        <ValueCard
          title="Connect with experts"
          desc="Discover specialists by disease area and publications. Request meetings when they’re active on MedLink."
          icon={<IconExpert />}
        />
      </section>

      {/* SPLIT: Patient / Researcher */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid lg:grid-cols-2 gap-6">
        <PersonaCard
          badge="For Patients & Caregivers"
          title="Personalized help for your condition"
          bullets={[
            "Find recruiting trials near you",
            "Understand research with AI summaries",
            "Save experts, trials & publications",
          ]}
          ctaLabel="Start as Patient"
          to="/register"
        />
        <PersonaCard
          badge="For Researchers"
          title="Speed up literature & collaborations"
          bullets={[
            "Auto-summarize publications",
            "Track & manage your trials",
            "Find collaborators by specialty",
          ]}
          ctaLabel="Start as Researcher"
          to="/register"
          accent="blue"
        />
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-3xl font-bold text-center">How MedLink works</h2>
        <p className="text-slate-600 text-center mt-2">
          Three simple steps to get value fast.
        </p>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          <Step
            n="1"
            title="Tell us your focus"
            desc="Enter conditions like 'glioma' or 'lung cancer'. Add location to refine results."
          />
          <Step
            n="2"
            title="Get tailored results"
            desc="We recommend trials, experts, and papers based on your profile — with AI summaries."
          />
          <Step
            n="3"
            title="Track & take action"
            desc="Save favorites, contact trial coordinators, and request expert meetings."
          />
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="bg-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 text-center text-white">
          <h3 className="text-2xl font-bold">Ready to try MedLink AI?</h3>
          <p className="text-blue-100 mt-1">
            Create a free account — it takes less than a minute.
          </p>
          <div className="mt-5 flex gap-3 justify-center">
            <Link
              to="/register"
              className="px-5 py-3 rounded bg-white text-blue-700 hover:bg-blue-50"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-5 py-3 rounded border border-white/40 hover:bg-white/10"
            >
              Sign in
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-50 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid sm:grid-cols-3 gap-6 text-sm">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-md bg-blue-600 grid place-items-center text-white text-sm font-bold">
                M
              </div>
              <span className="font-semibold">MedLink AI</span>
            </div>
            <p className="text-slate-600 mt-3">
              AI-assisted discovery for patients & researchers. We summarize
              research — not give medical advice.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Explore</h4>
            <ul className="space-y-1 text-slate-600">
              <li>
                <Link to="/publications" className="hover:text-blue-700">
                  Publications
                </Link>
              </li>
              <li>
                <Link to="/trials" className="hover:text-blue-700">
                  Clinical Trials
                </Link>
              </li>
              <li>
                <Link to="/experts" className="hover:text-blue-700">
                  Experts
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Get started</h4>
            <ul className="space-y-1 text-slate-600">
              <li>
                <Link to="/register" className="hover:text-blue-700">
                  Create account
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-blue-700">
                  Sign in
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t py-4 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} MedLink AI. For educational use only —
          not medical advice.
        </div>
      </footer>
    </div>
  );
}

/* ======= small presentational blocks ======= */

function ValueCard({ title, desc, icon }) {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-6">
      <div className="h-10 w-10 rounded-lg bg-blue-600/10 text-blue-700 grid place-items-center mb-3">
        {icon}
      </div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="mt-1 text-slate-600 text-sm">{desc}</p>
    </div>
  );
}

function PersonaCard({ badge, title, bullets, ctaLabel, to }) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <span className="text-xs font-semibold uppercase tracking-widest text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
        {badge}
      </span>
      <h3 className="mt-3 text-2xl font-bold">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm text-slate-700">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-1 h-2 w-2 bg-blue-600 rounded-full" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <Link
        to={to}
        className="mt-5 inline-block px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
      >
        {ctaLabel}
      </Link>
    </div>
  );
}

function Step({ n, title, desc }) {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-6">
      <div className="h-8 w-8 rounded-full bg-blue-600 text-white grid place-items-center font-bold">
        {n}
      </div>
      <h4 className="mt-3 font-semibold">{title}</h4>
      <p className="text-sm text-slate-600 mt-1">{desc}</p>
    </div>
  );
}

/* ======= inline SVG icons ======= */

function IconSpark() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5">
      <path
        d="M12 2l1.8 5.4L19 9l-5.2 1.6L12 16l-1.8-5.4L5 9l5.2-1.6L12 2z"
        fill="currentColor"
      />
    </svg>
  );
}
function IconTrial() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5">
      <path
        d="M4 5h16v2H4V5zm0 6h16v2H4v-2zm0 6h10v2H4v-2z"
        fill="currentColor"
      />
    </svg>
  );
}
function IconExpert() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5">
      <path
        d="M12 12a5 5 0 100-10 5 5 0 000 10zm-7 9a7 7 0 1114 0H5z"
        fill="currentColor"
      />
    </svg>
  );
}

function HeroIllustration() {
  return (
    <div className="grid gap-4">
      {/* top row */}
      <div className="grid grid-cols-2 gap-4">
        <Panel title="AI Summary" lines={3} />
        <Panel
          title="Trial Finder"
          pills={["Recruiting", "Phase II", "Nearby"]}
        />
      </div>
      {/* bottom row */}
      <div className="grid grid-cols-3 gap-4">
        <CardTiny title="NEJM" />
        <CardTiny title="JAMA" />
        <CardTiny title="Nature Med" />
      </div>
    </div>
  );
}
function Panel({ title, lines = 2, pills = [] }) {
  return (
    <div className="border rounded-xl p-4">
      <div className="text-xs font-semibold text-slate-500">{title}</div>
      <div className="mt-2 space-y-2">
        {[...Array(lines)].map((_, i) => (
          <div key={i} className="h-2 rounded bg-slate-200" />
        ))}
      </div>
      {pills.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {pills.map((p, i) => (
            <span
              key={i}
              className="text-[10px] px-2 py-1 rounded bg-blue-50 text-blue-700 border border-blue-100"
            >
              {p}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
function CardTiny({ title }) {
  return (
    <div className="border rounded-lg p-3">
      <div className="h-2 w-10 bg-slate-200 rounded" />
      <div className="mt-2 text-[10px] text-slate-500">{title}</div>
    </div>
  );
}
