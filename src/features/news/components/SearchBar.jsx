function SearchBar({ query, setQuery }) {
  return (
    <input
      type="text"
      placeholder="Search news..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="w-full mb-4 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}

export default SearchBar;