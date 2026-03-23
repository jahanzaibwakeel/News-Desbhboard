import axios from "axios";

const BASE_URL = "https://gnews.io/api/v4";

export const getTopNews = async (category = "general", query = "") => {
  try {
    const endpoint = query ? "search" : "top-headlines";

    const response = await axios.get(`${BASE_URL}/${endpoint}`, {
      params: {
        category,
        q: query,
        lang: "en",
        country: "us",
        max: 10,
        apikey: import.meta.env.VITE_GNEWS_API_KEY,
      },
    });

    if (!response.data.articles) {
      throw new Error("Invalid API response structure");
    }

    return response.data.articles;

  } catch (error) {

    // Network error
    if (error.code === "ERR_NETWORK") {
      throw new Error("Network error. Check your internet connection.");
    }

    // API response error
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        throw new Error("Invalid API key.");
      }

      if (status === 429) {
        throw new Error("API rate limit exceeded.");
      }

      throw new Error("Server error occurred.");
    }

    // Unknown error
    throw new Error("Something went wrong.");
  }
};