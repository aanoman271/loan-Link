import React from "react";
import heroImg from "../assets/Loan-underwriting-automation-1.webp";
import { Link } from "react-router";
const HeroBAnner = () => {
  return (
    <section className="flex flex-col-reverse md:flex-row min-h-[80vh]">
      {/* TEXT SECTION */}
      <div className="bg-[#172358] flex flex-col justify-center gap-6 px-6 md:px-12 py-10 md:w-1/2 w-full">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight text-gray-200">
          <span className="text-white text-4xl md:text-6xl">Smart</span>{" "}
          <span className="text-blue-500">Loans</span> for <br />a Better{" "}
          <span className="text-yellow-200">Tomorrow</span>
        </h1>

        <p className="text-gray-300 text-base md:text-lg max-w-lg">
          Get the financial support you need with easy approval, low interest
          rates, and flexible repayment plans.
        </p>

        <Link
          to="/allLoan"
          className="inline-block w-fit px-8 py-3 rounded-full bg-blue-600 text-white font-medium
          hover:bg-blue-700 transition"
        >
          Explore Loans
        </Link>
      </div>

      {/* IMAGE SECTION */}
      <div className="md:w-1/2 w-full h-64 md:h-auto overflow-hidden">
        <img
          src={heroImg}
          alt="Loan service"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default HeroBAnner;
