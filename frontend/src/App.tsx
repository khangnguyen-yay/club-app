import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
// Import your page components
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Calendar from "./pages/Calendar";

import './pages/NavigationUI/Navigation.css';

function App() {
  return (
    <Router>
      <nav className="navLinks">
        {/* Simple navigation links */}
        <NavLink to="/" className="link">Home</NavLink>
        <NavLink to="/explore" className="link">Explore</NavLink>
        <NavLink to="/calendar" className="link">Calendar</NavLink>
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
