import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
// Import your page components
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Calendar from "./pages/Calendar";

import HomeLogo from './pages/NavigationUI/NavigationImages/home.svg';
import ExploreLogo from './pages/NavigationUI/NavigationImages/explore.svg';
import CalendarLogo from './pages/NavigationUI/NavigationImages/calendar.svg';

import './pages/NavigationUI/Navigation.css';

function App() {
  return (
    <Router>
      <nav className="navLinks">
        {/* Simple navigation links */}
        <NavLink to="/" className="link">
          <img src={HomeLogo} className="navBarLogo"></img> Home
        </NavLink>

        <NavLink to="/explore" className="link">
          <img src={ExploreLogo} className="navBarLogo"></img> Explore
        </NavLink>
      
        <NavLink to="/calendar" className="link">
        <img src={CalendarLogo} className="navBarLogo"></img> Calendar
        </NavLink>
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
