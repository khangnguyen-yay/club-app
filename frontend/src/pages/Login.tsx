import React from "react";
import "../styles/login-page.css";

const LoginPage: React.FC = () => {
  const handleGoogleLogin = () => {
    // Redirect to backend Google OAuth route
    window.location.href = "http://localhost:3000/auth/google";
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="page-title">Clubfindr</h1>
        <p className="page-subtitle">Discover and Join Campus Clubs Effortlessly</p>

        <button
          onClick={handleGoogleLogin}
          className="google button"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default LoginPage;