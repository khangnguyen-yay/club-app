
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
// Import your page components
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Calendar from "./pages/Calendar";
import LoginPage from "./pages/Login";
import Header from "./components/header";
import { ThemeProvider } from './theme/ThemeContext';

import HomeLogo from './styles/navigation-ui/home.svg';
import ExploreLogo from './styles/navigation-ui/explore.svg';
import CalendarLogo from './styles/navigation-ui/calendar.svg';

import './styles/navigation-ui/Navigation.css';

const AppLayout = () => {
  const location = useLocation();

  //check if current path is /login
  //if so, do not render navigation bar and header component
  const isLoginPage = location.pathname === '/login';

  return (
    <>
      {/* if not on login page, then show header and nav bar*/}

      {!isLoginPage && <Header />}
      {!isLoginPage && (
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
    <ThemeProvider>
      <Router>
        <AppLayout />
      </Router>
    </ThemeProvider>
  );
}

export default App;
