import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="w-full bg-white border-b shadow-sm px-6 py-3 flex justify-between items-center">
      <Link to="/dashboard" className="text-xl font-semibold text-blue-600">
        MedLink
      </Link>

      <div className="flex items-center gap-4">
        <Link to="/publications" className="hover:text-blue-600">
          Publications
        </Link>
        <Link to="/trials" className="hover:text-blue-600">
          Trials
        </Link>
        <Link to="/experts" className="hover:text-blue-600">
          Experts
        </Link>

        {user ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <Link to="/" className="bg-blue-600 text-white px-3 py-1 rounded">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
