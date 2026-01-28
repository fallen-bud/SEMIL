import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/navbar/Navbar";
import RegisterPage from "./pages/auth/register/RegisterPage";
import LoginPage from "./pages/auth/login/LoginPage";
import SearchMissingReportPage from "./pages/missing/Report/ReportMissingPage";
import UploadMissingPersonPage from "./pages/missingPerson/UploadMissingPersonPage";
import HomePage from "./pages/Home/HomePage";
// future:
// import LoginPage from "./pages/auth/LoginPage";
// import RegisterPage from "./pages/auth/RegisterPage";

const App = () => {
  return (
    <>
     {/* Navbar visible on all pages */}
     <Navbar/>
    
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<HomePage />} />

        {/* Auth Pages (future) */}
        <Route path="/login" element={<LoginPage />} /> 
        <Route path="/register" element={<RegisterPage />} /> 

        {/* Protected Pages (future) */}
        <Route path="/report-missing" element={<SearchMissingReportPage />} />
        <Route path="/upload-missing-person" element={<UploadMissingPersonPage />} />
      </Routes>
    </>
  );
};

export default App;
