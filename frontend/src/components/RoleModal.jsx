import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function RoleModal({ open, onClose }) {
  const navigate = useNavigate();

  if (!open) return null;

  const handleSelect = (role) => {
    onClose();
    navigate(`/register?role=${role}`);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="bg-white dark:bg-[#0F172A] w-full max-w-md rounded-2xl shadow-xl p-6"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white text-center">
            Choose Your Role
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-300 text-center mt-1">
            This helps us personalize your experience.
          </p>

          <div className="mt-6 space-y-3">
            <button
              onClick={() => handleSelect("patient")}
              className="w-full border border-slate-300 dark:border-slate-600 rounded-lg py-3 text-slate-700 dark:text-white hover:bg-blue-50 dark:hover:bg-blue-900/30 transition"
            >
              I am a Patient / Caregiver
            </button>
            <button
              onClick={() => handleSelect("researcher")}
              className="w-full border border-slate-300 dark:border-slate-600 rounded-lg py-3 text-slate-700 dark:text-white hover:bg-blue-50 dark:hover:bg-blue-900/30 transition"
            >
              I am a Researcher
            </button>
          </div>

          <button
            onClick={onClose}
            className="mt-4 w-full text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white"
          >
            Cancel
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
