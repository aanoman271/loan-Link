import React from "react";
import HeroBAnner from "../components/HeroBAnner";
import HowWorks from "./HowWorks";
import AvailableLoans from "./AvailableLoans";
import Stats from "../components/Stats";
import Testimonials from "../components/Testimonials";
import About from "../pages/About"
import DemoCredentials from "../components/DemoCredentials";
const Home = () => {
  return (
    <div className="space-y-0">
      <HeroBAnner></HeroBAnner>
      <DemoCredentials></DemoCredentials>
      <Stats></Stats>
      <AvailableLoans></AvailableLoans>
      <HowWorks></HowWorks>
      <About></About>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;

