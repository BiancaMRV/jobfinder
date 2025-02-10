import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./App.css";
import { SignUp } from "./pages/Auth/SignUp";
import LogIn from "./pages/Auth/LogIn";
import HomePage from "./components/jobs/HomePage/HomePage";
import JobCardPage from "./components/jobs/JobCardPage/JobCardPage";
import ApplyNow from "./components/jobs/ApplyNow/ApplyNow";
import { Profile } from "./components/profile/Profile/Profile";

function App() {
  return (
    <Router>
      <Toaster
        position={"top-right"}
        toastOptions={{
          duration: 4000,
          style: {
            background: "#333",
            color: "#fff",
            padding: "12px",
            fontSize: "14px",
            maxWidth: "350px",
          },
          error: {
            style: {
              background: "#FEE2E2",
              color: "#991B1B",
            },
          },
          success: {
            style: {
              background: "#D1FAE5",
              color: "#065F46",
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/job" element={<JobCardPage />} />
        <Route path="/jobs/:jobOfferId" element={<JobCardPage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/applynow/:jobOfferId" element={<ApplyNow />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
