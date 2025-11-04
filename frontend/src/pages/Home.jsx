import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />

      <div className="flex flex-col items-center justify-center text-center mt-20 px-6">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Welcome to MedLink AI
        </h1>
        <p className="text-gray-600 max-w-xl">
          A lightweight medical research platform to explore clinical trials,
          publications and AI-assisted summaries — all in one place.
        </p>

        <div className="flex gap-4 mt-8">
          <Link
            to="/register"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            Get Started
          </Link>
          <Link
            to="/publications"
            className="border border-blue-600 text-blue-600 px-5 py-2 rounded hover:bg-blue-50"
          >
            Explore Research
          </Link>
        </div>
      </div>
    </div>
  );
}
