import React from "react";
import Section from "../reuseabble/Section";
import img from "../assets/manager.jpg";
import img2 from "../assets/multiple laons.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg";
import img6 from "../assets/img6.jpg";
const HowWorks = () => {
  return (
    <Section className="  w-full   ">
      <div className="flex flex-col  items-center gap-4 py-7">
        <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-xl shadow-lg font-bold text-xl">
          LL
        </div>
        <h2 className="text-3xl font-bold mb-6 text-center">How Its Work</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-14">
        <div className="flex justify-between gap-5 px-8 py-6  items-center border border-gray-300 shadow-2xl rounded-md">
          <div className="w-96 h-full relative ">
            <p className="text-2xl border w-10 h-10 flex justify-center items-center font-bold text-gray-900 rounded-full border-gray-300 bg-blue-600  absolute top-[-20px] left-[-20px] ">
              1
            </p>
            <img className="w-full h-full" src={img} alt="" />
          </div>
          <p className="font-medium text-gray-600">
            Loan managers create and publish loan offers on LoanLink, including
            loan type, interest rate, EMI plans, and required documents. This
            makes loan options transparent and easy to understand.
          </p>
        </div>
        <div className="flex justify-between gap-5 px-8 py-6  items-center border border-gray-300 shadow-2xl rounded-md">
          <div className="w-96 h-35 relative ">
            <p className="text-2xl border w-10 h-10 flex justify-center items-center font-bold text-gray-900 rounded-full border-gray-300 bg-blue-600  absolute top-[-20px] left-[-20px] ">
              2
            </p>
            <img className="w-full h-full" src={img2} alt="" />
          </div>
          <p className="font-medium text-gray-600">
            By clicking View Details, users can see complete loan information
            such as description, EMI plans, maximum limit, and eligibility
            before applying.{" "}
          </p>
        </div>
        <div className="flex justify-between gap-5 px-8 py-6  items-center border border-gray-300 shadow-2xl rounded-md">
          <div className="w-96 h-35 relative ">
            <p className="text-2xl border w-10 h-10 flex justify-center items-center font-bold text-gray-900 rounded-full border-gray-300 bg-blue-600  absolute top-[-20px] left-[-20px] ">
              3
            </p>
            <img className="w-full h-full" src={img3} alt="" />
          </div>
          <p className="text-gray-600 font-medium">
            Users can explore all available loans in one place. They can compare
            interest rates, categories, and limits to choose the best loan for
            their needs.
          </p>
        </div>
        <div className="flex justify-between gap-5 px-8 py-6  items-center border border-gray-300 shadow-2xl rounded-md">
          <div className="w-96 h-35 relative ">
            <p className="text-2xl border w-10 h-10 flex justify-center items-center font-bold text-gray-900 rounded-full border-gray-300 bg-blue-600  absolute top-[-20px] left-[-20px] ">
              4
            </p>
            <img className="w-full h-full" src={img4} alt="" />
          </div>
          <p className="text-gray-600 font-medium">
            Users can apply for a loan online by submitting required documents
            and personal details. The application process is simple, fast, and
            secure.
          </p>
        </div>
        <div className="flex justify-between gap-5 px-8 py-6  items-center border border-gray-300 shadow-2xl rounded-md">
          <div className="w-96 h-35 relative ">
            <p className="text-2xl border w-10 h-10 flex justify-center items-center font-bold text-gray-900 rounded-full border-gray-300 bg-blue-600  absolute top-[-20px] left-[-20px] ">
              5
            </p>
            <img className="w-full h-full" src={img5} alt="" />
          </div>
          <p className="text-gray-600 font-medium">
            Loan managers review applications, verify documents, and evaluate
            eligibility. They can approve or reject applications based on
            provided information.
          </p>
        </div>
        <div className="flex justify-between gap-5 px-8 py-6  items-center border border-gray-300 shadow-2xl rounded-md">
          <div className="w-96 h-35 relative ">
            <p className="text-2xl border w-10 h-10 flex justify-center items-center font-bold text-gray-900 rounded-full border-gray-300 bg-blue-600  absolute top-[-20px] left-[-20px] ">
              6
            </p>
            <img className="w-full h-full" src={img6} alt="" />
          </div>
          <p className="text-gray-600 font-medium">
            Once approved, the loan is successfully passed by the manager, and
            the user is notified. The borrower can then proceed with the
            approved loan amount confidently.
          </p>
        </div>
      </div>
    </Section>
  );
};

export default HowWorks;
