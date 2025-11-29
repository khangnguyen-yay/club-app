
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
// Import your page components
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Calendar from "./pages/Calendar";
import LoginPage from "./pages/Login";

import HomeLogo from './pages/NavigationUI/NavigationImages/home.svg';
import ExploreLogo from './pages/NavigationUI/NavigationImages/explore.svg';
import CalendarLogo from './pages/NavigationUI/NavigationImages/calendar.svg';

import './pages/NavigationUI/Navigation.css';

const AppLayout = () => {
  const location = useLocation();
  const hideNavBar = location.pathname === '/login';

  return (
    <>
      {!hideNavBar && (
        <nav className="navLinks">
        {/* Simple navigation links */}
        <NavLink to="/home" className="link">
          <img src={HomeLogo} className="navBarLogo"></img> Home
        </NavLink>

        <NavLink to="/explore" className="link">
          <img src={ExploreLogo} className="navBarLogo"></img> Explore
        </NavLink>
      
        <NavLink to="/calendar" className="link">
        <img src={CalendarLogo} className="navBarLogo"></img> Calendar
        </NavLink>
      </nav>
    )}

    <Routes>
        {/* Login Page first */}
        <Route path="/login" element={<LoginPage />} />
        {/* Define your routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/calendar" element={<Calendar />} />

        {/* Default and all other routes should go to login page*/}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
