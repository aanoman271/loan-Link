import React from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hook/useAuth";
import Loading from "../components/Loading";

const PrivetRoute = ({ children }) => {
  const { user, FetchLoadding } = useAuth();
  const location = useLocation();
  //   if () {
  //     return <Loading></Loading>;
  //   }

  if (!user) {
    return <Navigate to="/login" state={location.pathname} />;
  }
  return children;
};

export default PrivetRoute;
