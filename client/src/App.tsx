import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import SignUp from "./pages/Auth/SignUp";
import LogIn from "./pages/Auth/LogIn";
import HomePage from "./components/jobs/HomePage/HomePage";
import JobCardPage from "./components/jobs/JobCardPage/JobCardPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/job" element={<JobCardPage />} />
        <Route path="/jobs/:jobOfferId" element={<JobCardPage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
