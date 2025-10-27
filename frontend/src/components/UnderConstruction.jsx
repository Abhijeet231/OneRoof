import { Construction } from "lucide-react"; // fun icon
import { motion } from "framer-motion";

export default function UnderConstruction({ message }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Construction size={80} className="text-yellow-500 mb-4" />
      </motion.div>
      <h1 className="text-3xl font-bold mb-2">🚧 Page Under Construction 🚧</h1>
      <p className="text-lg text-gray-600 max-w-md mb-6">
        {message ||
          "Oops! The developer is still laying the foundation for this page... "}
      </p>
      <a
        href="/"
        className="bg-blue-600 text-white px-5 py-2 rounded-xl shadow hover:bg-blue-700 transition"
      >
        Go Back Home
      </a>
    </div>
  );
}
