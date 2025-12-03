import React from "react";
import "../styles/login-page.css";
import { useAuth } from "../AuthContext/authContext";

const LoginPage: React.FC = () => {
  const { loginWithGoogle } = useAuth();

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="page-title">Clubfindr</h1>
        <p className="page-subtitle">Discover and Join Campus Clubs Effortlessly</p>

        <button onClick={loginWithGoogle} className="google button">
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
