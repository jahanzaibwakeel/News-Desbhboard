import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";

import { useNews } from "../hooks/useNews";
import { useBookmarks } from "../hooks/useBookmarks";

import NewsCard from "../components/NewsCard";
import CategoryTabs from "../components/CategoryTabs";
import SearchBar from "../components/SearchBar";
import CategoryChart from "../components/CategoryChart";

import ErrorMessage from "../../../shared/components/ErrorMessage";
import ArticleModal from "../../../shared/components/ArticleModal";
import NewsSkeleton from "../../../shared/components/NewsSkeleton";

function NewsPage() {
  const {
    articles,
    category,
    setCategory,
    query,
    setQuery,
    loading,
    error,
    page,
    setPage,
  } = useNews();

  const { bookmarks, toggleBookmark, isBookmarked } = useBookmarks();

  const [selectedArticle, setSelectedArticle] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { ref, inView } = useInView();

  // Infinite scroll
  useEffect(() => {
    if (inView && !loading) {
      setPage((prev) => prev + 1);
    }
  }, [inView]);

  return (
    <div
      className={`min-h-screen px-6 py-8 transition-all duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-slate-900 to-slate-800 text-white"
          : "bg-gray-100 text-black"
      }`}
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold tracking-tight">
            News Intelligence
          </h1>

          <div className="flex gap-3">
            <Link
              to="/saved"
              className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition"
            >
              Saved
            </Link>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
            >
              Toggle Theme
            </button>
          </div>
        </div>

        <SearchBar query={query} setQuery={setQuery} />
        <CategoryTabs category={category} setCategory={setCategory} />

        {error && <ErrorMessage message={error} />}

        {/* Main Layout */}
        <div className="grid lg:grid-cols-4 gap-6 mt-6">

          {/* News Section */}
          <div className="lg:col-span-3">
            {loading && page === 1 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {[...Array(6)].map((_, i) => (
                  <NewsSkeleton key={i} />
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {articles.map((article, index) => (
                  <NewsCard
                    key={index}
                    article={article}
                    onClick={() => setSelectedArticle(article)}
                    toggleBookmark={toggleBookmark}
                    isBookmarked={isBookmarked}
                  />
                ))}
              </div>
            )}

            {/* Infinite Scroll Trigger */}
            <div ref={ref} className="h-10"></div>

            {loading && page > 1 && (
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                {[...Array(2)].map((_, i) => (
                  <NewsSkeleton key={i} />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <motion.div
            initial={{ width: 300 }}
            animate={{ width: sidebarOpen ? 300 : 70 }}
            transition={{ duration: 0.3 }}
            className={`rounded-xl p-4 h-fit shadow-lg overflow-hidden ${
              darkMode ? "bg-slate-800" : "bg-white"
            }`}
          >
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="mb-4 text-sm bg-blue-600 px-3 py-1 rounded"
            >
              {sidebarOpen ? "Collapse" : "Open"}
            </button>

            {sidebarOpen && (
              <>
                {/* Bookmarks */}
                <h2 className="text-lg font-semibold mb-3">
                  Bookmarked Articles
                </h2>

                {bookmarks.length === 0 && (
                  <p className="text-sm opacity-70">
                    No bookmarks yet.
                  </p>
                )}

                {bookmarks.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedArticle(item)}
                    className="text-sm mb-2 cursor-pointer hover:text-blue-500 transition"
                  >
                    {item.title}
                  </div>
                ))}

                {/* Analytics */}
                <div className="mt-6">
                  <h3 className="text-sm font-semibold mb-3">
                    Source Analytics
                  </h3>

                  <div className="bg-slate-900 rounded-xl p-3">
                    <CategoryChart articles={articles} />
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </div>
  );
}

export default NewsPage;