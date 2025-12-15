import React from "react";
import HeroBAnner from "../components/HeroBAnner";
import HowWorks from "./HowWorks";
import AvailableLoans from "./AvailableLoans";

const Home = () => {
  return (
    <div>
      <HeroBAnner></HeroBAnner>
      <AvailableLoans></AvailableLoans>
      <HowWorks></HowWorks>
    </div>
  );
};

export default Home;
