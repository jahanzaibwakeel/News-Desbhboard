import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

function ArticleModal({ article, onClose }) {
  const [summary, setSummary] = useState(null);
  const [loadingSummary, setLoadingSummary] = useState(false);

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Fake AI summary (we'll connect real API later)
  const handleSummarize = async () => {
    if (!article?.description) return;

    setLoadingSummary(true);

    // Simulate AI delay
    setTimeout(() => {
      setSummary(
        "This article discusses key developments and provides insights into the topic, highlighting its broader impact and implications."
      );
      setLoadingSummary(false);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {article && (
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} // close on outside click
        >
          <motion.div
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
            className="bg-gradient-to-br from-slate-900 to-slate-800 text-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden relative border border-white/10"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-slate-400 hover:text-white transition"
            >
              <X size={26} />
            </button>

            {/* Image */}
            {article.image && (
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-72 object-cover"
                onError={(e) => (e.target.style.display = "none")}
              />
            )}

            {/* Content */}
            <div className="p-8 max-h-[70vh] overflow-y-auto custom-scroll">

              <h2 className="text-3xl font-bold mb-4 leading-tight">
                {article.title}
              </h2>

              <p className="text-slate-300 mb-6 leading-relaxed">
                {article.description || "No description available."}
              </p>

              {/* AI Summary Section */}
              <div className="mb-6">
                <button
                  onClick={handleSummarize}
                  disabled={loadingSummary}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition disabled:opacity-50"
                >
                  <Sparkles size={18} />
                  {loadingSummary ? "Generating Summary..." : "Generate AI Summary"}
                </button>

                {summary && (
                  <div className="mt-4 p-4 rounded-xl bg-slate-800 border border-purple-500/30">
                    <h3 className="font-semibold mb-2 text-purple-400">
                      AI Summary
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {summary}
                    </p>
                  </div>
                )}
              </div>

              {/* Read Full */}
              <a
                href={article.url}
                target="_blank"
                rel="noreferrer"
                className="inline-block px-5 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl transition font-medium shadow-lg"
              >
                Read Full Article →
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ArticleModal;