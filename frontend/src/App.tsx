import { Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/Home/HomePage";
// future:
// import LoginPage from "./pages/auth/LoginPage";
// import RegisterPage from "./pages/auth/RegisterPage";

const App = () => {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<HomePage />} />

      {/* Auth Pages (future) */}
      {/* <Route path="/login" element={<LoginPage />} /> */}
      {/* <Route path="/register" element={<RegisterPage />} /> */}

      {/* Protected Pages (future) */}
      {/* <Route path="/report-missing" element={<UploadMissingPage />} /> */}
      {/* <Route path="/found-person" element={<SearchMissingPage />} /> */}
    </Routes>
  );
};

export default App;
