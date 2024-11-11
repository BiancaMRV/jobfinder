import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import SignUp from "./pages/Auth/SignUp";
import LogIn from "./pages/Auth/LogIn";
import Navbar from "./components/layout/Navbar/Navbar";
import Searchbar from "./components/layout/Searchbar/Searchbar";
import Header from "./components/layout/Header/Header";
import RecommendedJobs from "./components/jobs/RecommendedJobs/RecommendedJobs";
import JobFilter from "./components/jobs/JobList/JobFilter";
import SalaryRangeSlider from "./components/jobs/SalaryRangeSlider/SalaryRangeSlider";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SalaryRangeSlider />} />
        <Route path="/JobFilter" element={<JobFilter />} />
        <Route path="/RecommendedJobs" element={<RecommendedJobs />} />
        <Route path="/Header" element={<Header />} />
        <Route path="/Searchbar" element={<Searchbar />} />
        <Route path="/Navbar" element={<Navbar />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
