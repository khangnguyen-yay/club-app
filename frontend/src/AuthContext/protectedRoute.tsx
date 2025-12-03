import React, { type JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./authContext";

 /* PROTECTED ROUTE COMPONENT */
 /* This component wraps the Home, Explore and Calendar pages to ensure only authenticated users can access them */

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    //send to login
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // return page by allowing access
  return children;
};

export default ProtectedRoute;
