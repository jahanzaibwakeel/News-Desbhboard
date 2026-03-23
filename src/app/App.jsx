import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewsPage from "../features/news/pages/NewsPage";
import SavedPage from "../features/news/pages/SavedPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NewsPage />} />
        <Route path="/saved" element={<SavedPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;