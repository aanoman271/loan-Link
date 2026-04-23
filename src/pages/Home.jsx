import React from "react";
import HeroBAnner from "../components/HeroBAnner";
import HowWorks from "./HowWorks";
import AvailableLoans from "./AvailableLoans";
import Stats from "../components/Stats";
import Testimonials from "../components/Testimonials";

const Home = () => {
  return (
    <div className="space-y-0">
      <HeroBAnner></HeroBAnner>
      <Stats></Stats>
      <AvailableLoans></AvailableLoans>
      <HowWorks></HowWorks>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;
