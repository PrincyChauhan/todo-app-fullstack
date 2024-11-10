import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// ProtectedRoute component to check authentication
const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  // If no token, redirect to login
  return token ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
