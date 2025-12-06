import React from "react";
import "../styles/login-page.css";
import clubfindrLogo from "../assets/clubfinder-logo.png"; 
import { useAuth } from "../AuthContext/authContext";

const LoginPage: React.FC = () => {
  //calls hook useAuth created in AuthContext to store user state
  const { loginWithGoogle } = useAuth();

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <img
            src={clubfindrLogo}
            alt="Clubfindr logo"
            className="login-logo"
          />
          <div>
            <h1 className="page-title">clubfindr</h1>
            <p className="page-tagline">club apps made convenient</p>
          </div>
        </div>

        <p className="page-subtitle">
          Discover and Join Campus Clubs Effortlessly
        </p>

        <button onClick={loginWithGoogle} className="google button">
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
