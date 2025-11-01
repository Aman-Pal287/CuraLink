import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow">
        <h1 className="text-3xl font-bold">Welcome to CuraLink (Demo)</h1>
        <p className="mt-4 text-slate-600">
          Discover trials, publications and health experts — demo dashboard
          below.
        </p>
        <div className="mt-6 flex gap-4">
          <Link
            to="/dashboard"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
