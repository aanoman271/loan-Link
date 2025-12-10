import React from "react";
import Navbar from "../components/header/Navbar";
import { Outlet } from "react-router";
import Fotter from "../components/fotter/Fotter";

const Root = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Fotter></Fotter>
    </div>
  );
};

export default Root;
