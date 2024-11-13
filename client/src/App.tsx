import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import SignUp from "./pages/Auth/SignUp";
import LogIn from "./pages/Auth/LogIn";
import Navbar from "./components/layout/Navbar/Navbar";
import Searchbar from "./components/layout/Searchbar/Searchbar";
import Header from "./components/layout/Header/Header";
import RecommendedJobs from "./components/jobs/RecommendedJobs/RecommendedJobs";
import JobFilter from "./components/jobs/JobList/JobFilter";
import SalaryRange from "./components/jobs/SalaryRange/SalaryRange";
import ExperienceLevel from "./components/jobs/ExperienceLevel/ExperienceLevel";
import FiltersInterface from "./components/jobs/FiltersInterface/FiltersInterface";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FiltersInterface />} />
        <Route path="/ExperienceLevel" element={<ExperienceLevel />} />
        <Route path="/SalaryRange" element={<SalaryRange />} />
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
