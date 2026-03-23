import { Bookmark } from "lucide-react";

function NewsCard({ article, onClick, toggleBookmark, isBookmarked }) {
  const bookmarked = isBookmarked(article);

  return (
    <div
      className="relative bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:scale-[1.03] hover:shadow-2xl transition duration-300 cursor-pointer"
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleBookmark(article);
        }}
        className="absolute top-3 right-3 bg-black/50 p-2 rounded-full"
      >
        <Bookmark
          size={18}
          className={bookmarked ? "text-yellow-400 fill-yellow-400" : "text-white"}
        />
      </button>

      <div onClick={onClick}>
        {article.image && (
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-48 object-cover"
          />
        )}

        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2 line-clamp-2">
            {article.title}
          </h2>

          <p className="text-sm text-slate-400 line-clamp-3">
            {article.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;