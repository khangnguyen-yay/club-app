import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// Import your page components
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Calendar from "./pages/Calendar";

function App() {
  return (
    <Router>
      <nav>
        {/* Simple navigation links */}
        <Link to="/">Home</Link> |{" "}
        <Link to="/explore">Explore</Link> |{" "}
        <Link to="/calendar">Calendar</Link>
      </nav>

      <Routes>
        {/* Define your routes */}
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </Router>
  );
}

export default App;
