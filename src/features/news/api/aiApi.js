import axios from "axios";

export const summarizeArticle = async (text) => {
  const response = await axios.post(
    "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
    { inputs: text },
    {
      headers: {
        Authorization: `Bearer YOUR_FREE_TOKEN`,
      },
    }
  );

  return response.data[0].summary_text;
};