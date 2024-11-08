import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import SignUp from "./pages/Auth/SignUp";
import LogIn from "./pages/Auth/LogIn";
import Navbar from "./components/layout/Navbar/Navbar";
import Searchbar from "./components/layout/Searchbar/Searchbar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Searchbar />} />
        <Route path="/Navbar" element={<Navbar />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
