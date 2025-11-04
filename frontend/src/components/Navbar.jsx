import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar({ user }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <header className="w-full bg-white/80 backdrop-blur border-b">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 group"
        >
          <div className="h-8 w-8 rounded-md bg-blue-600 grid place-items-center text-white font-bold">
            M
          </div>
          <span className="text-lg font-semibold tracking-tight group-hover:text-blue-700">
            MedLink&nbsp;AI
          </span>
        </button>

        <ul className="hidden md:flex items-center gap-6 text-sm">
          <li>
            <Link
              className={linkCls(pathname, "/publications")}
              to="/publications"
            >
              Publications
            </Link>
          </li>
          <li>
            <Link className={linkCls(pathname, "/trials")} to="/trials">
              Clinical Trials
            </Link>
          </li>
          <li>
            <Link className={linkCls(pathname, "/experts")} to="/experts">
              Experts
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="text-sm px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  document.cookie =
                    "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
                  window.location.href = "/"; // redirect to home
                }}
                className="text-sm px-3 py-2 rounded hover:bg-red-50 text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm px-3 py-2 rounded hover:bg-slate-100"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="text-sm px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Get started
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

function linkCls(pathname, to) {
  const active = pathname.startsWith(to);
  return `hover:text-blue-700 ${
    active ? "text-blue-700 font-medium" : "text-slate-600"
  }`;
}
