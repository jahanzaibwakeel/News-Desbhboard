import { useState, useEffect } from "react";

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("bookmarkedArticles");
    if (saved) {
      setBookmarks(JSON.parse(saved));
    }
  }, []);

  const toggleBookmark = (article) => {
    const exists = bookmarks.find((item) => item.url === article.url);

    let updated;

    if (exists) {
      updated = bookmarks.filter((item) => item.url !== article.url);
    } else {
      updated = [...bookmarks, article];
    }

    setBookmarks(updated);
    localStorage.setItem("bookmarkedArticles", JSON.stringify(updated));
  };

  const isBookmarked = (article) => {
    return bookmarks.some((item) => item.url === article.url);
  };

  return { bookmarks, toggleBookmark, isBookmarked };
};