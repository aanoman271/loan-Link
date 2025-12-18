import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";
import Lodding from "../components/Lodding";

const PrivetRoute = ({ children }) => {
  const { user, authLoadding } = useAuth();
  const location = useLocation();
  if (authLoadding) {
    return <Lodding></Lodding>;
  }

  if (!user) {
    return <Navigate to="/login" state={location.pathname} />;
  }
  return children;
};

export default PrivetRoute;
