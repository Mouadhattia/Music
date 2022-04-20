import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivatRoute = () => {
  const authorization = localStorage.getItem("token");
  return authorization ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivatRoute;
