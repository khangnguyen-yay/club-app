import { Routes, Route, NavLink, Navigate, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Calendar from "./pages/Calendar";
import LoginPage from "./pages/Login";
import Header from "./components/header";

import HomeLogo from "./styles/navigation-ui/home.svg";
import ExploreLogo from "./styles/navigation-ui/explore.svg";
import CalendarLogo from "./styles/navigation-ui/calendar.svg";

import "./styles/navigation-ui/Navigation.css";
import ProtectedRoute from "./AuthContext/protectedRoute";

const AppLayout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {/* Hide header + nav on login page */}
      {!isLoginPage && <Header />}
      {!isLoginPage && (
        <nav className="navLinks">
          <NavLink to="/home" className="link">
            <img src={HomeLogo} className="navBarLogo" /> Home
          </NavLink>

          <NavLink to="/explore" className="link">
            <img src={ExploreLogo} className="navBarLogo" /> Explore
          </NavLink>

          <NavLink to="/calendar" className="link">
            <img src={CalendarLogo} className="navBarLogo" /> Calendar
          </NavLink>
        </nav>
      )}

      <Routes>
        {/* Public login route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/explore"
          element={
            <ProtectedRoute>
              <Explore />
            </ProtectedRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <Calendar />
            </ProtectedRoute>
          }
        />

        {/* Default + any random routes lead to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
};

function App() {
  return <AppLayout />;
}

export default App;
