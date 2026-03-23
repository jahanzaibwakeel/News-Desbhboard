import { useState } from "react";
import { Link } from "react-router-dom";
import { useBookmarks } from "../hooks/useBookmarks";
import ArticleModal from "../../../shared/components/ArticleModal";

function SavedPage() {
  const { bookmarks } = useBookmarks();
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white px-6 py-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">
            Saved Articles
          </h1>

          <Link
            to="/"
            className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            Back to News
          </Link>
        </div>

        {bookmarks.length === 0 ? (
          <div className="text-center mt-20">
            <p className="text-slate-400 text-lg">
              No saved articles yet.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarks.map((article, index) => (
              <div
                key={index}
                onClick={() => setSelectedArticle(article)}
                className="cursor-pointer bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:scale-[1.02] transition"
              >
                {article.image && (
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                )}

                <div className="p-4">
                  <h2 className="font-semibold mb-2 line-clamp-2">
                    {article.title}
                  </h2>

                  <p className="text-sm text-slate-400 line-clamp-3">
                    {article.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </div>
  );
}

export default SavedPage;