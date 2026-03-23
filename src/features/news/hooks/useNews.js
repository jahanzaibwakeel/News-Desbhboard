import { useState, useEffect } from "react";
import { getTopNews } from "../api/newsApi";

export const useNews = () => {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState("general");
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setPage(1); // reset page on new search
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  // Reset page when category changes
  useEffect(() => {
    setPage(1);
  }, [category]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getTopNews(category, debouncedQuery, page);
      setArticles(data);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [category, debouncedQuery, page]);

  return {
    articles,
    category,
    setCategory,
    query,
    setQuery,
    loading,
    error,
    page,
    setPage,
  };
};