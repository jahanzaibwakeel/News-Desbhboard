const categories = ["general", "business", "technology", "sports"];

function CategoryTabs({ category, setCategory }) {
  return (
    <div className="flex gap-3 flex-wrap mb-4">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setCategory(cat)}
          className={`px-4 py-2 rounded-full text-sm capitalize transition
            ${
              category === cat
                ? "bg-blue-600 text-white"
                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default CategoryTabs;