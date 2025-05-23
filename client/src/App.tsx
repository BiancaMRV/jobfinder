import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./App.css";
import { SignUp } from "./pages/Auth/SignUp";
import LogIn from "./pages/Auth/LogIn";
import HomePage from "./components/jobs/HomePage/HomePage";
import JobCardPage from "./components/jobs/JobCardPage/JobCardPage";
import ApplyNow from "./components/jobs/ApplyNow/ApplyNow";
import { Profile } from "./components/profile/Profile/Profile";
import CompanyProfile from "./components/applications/Companyprofile";
import JobApplication from "./components/applications/JobApplication";
import Applications from "./components/applications/Applications";
import UserCandidate from "./components/applications/UserCandidate";

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
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/job" element={<JobCardPage />} />
        <Route path="/jobs/:jobOfferId" element={<JobCardPage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/" element={<SignUp />} />
        <Route path="/applynow/:jobOfferId" element={<ApplyNow />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/companyprofile" element={<CompanyProfile />} />
        <Route path="/jobapplication/" element={<JobApplication />} />
        <Route path="/applications" element={<Applications />} />
        <Route
          path="/usercandidate"
          element={<UserCandidate candidate={undefined} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
