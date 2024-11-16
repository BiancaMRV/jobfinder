import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import SignUp from "./pages/Auth/SignUp";
import LogIn from "./pages/Auth/LogIn";
import Navbar from "./components/layout/Navbar/Navbar";
import Searchbar from "./components/layout/Searchbar/Searchbar";
import Header from "./components/layout/Header/Header";
import RecommendedJobs from "./components/jobs/RecommendedJobs/RecommendedJobs";
import { FiltersInterface } from "./components/jobs/FiltersInterface/FiltersInterface";
import HomePage from "./components/jobs/HomePage/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/FiltersInterface" element={<FiltersInterface />} />
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
