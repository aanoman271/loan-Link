import React, { useEffect, useState } from "react";

import { useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useSecureInstance";
import Lodding from "../../../components/Lodding";

const ApplicationDeatails = () => {
  const { id } = useParams();
  console.log(id);
  const [application, setApplication] = useState(null);
  const instance = useAxiosSecure();
  const [lodding, setLodding] = useState(true);
  useEffect(() => {
    const fetch = async () => {
      try {
        setLodding(true);
        const res = await instance.get(`/applicationDeatail/${id}`);
        setApplication(res.data);
      } catch (error) {
        error(error.response.message || error.message);
      } finally {
        setLodding(false);
      }
    };
    fetch();
  }, [id]);
  console.log(application);
  if (lodding) return <Lodding></Lodding>;
  return (
    <div className="max-w-4xl mx-auto rounded-2xl shadow-sm">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold">Loan Application Details</h2>
            <p className="text-sm text-muted-foreground">
              Application ID: {application?._id}
            </p>
          </div>
          <div
            className={`font-bold rounded-b-lg px-3 py-2 text-white ${
              application?.status === "Pending"
                ? "bg-amber-500"
                : application?.status === "Rejected"
                ? "bg-red-600"
                : application?.status === "Approved"
                ? "bg-green-600"
                : "bg-gray-500"
            }`}
          >
            {application?.status || "Unknown"}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Loan Information</h3>
          <div className="grid grid-cols-3 border-b py-2">
            <span className="text-muted-foreground">Loan Title</span>
            <span className="col-span-2 font-medium">
              {application?.loanTitle}
            </span>
          </div>
          <div className="grid grid-cols-3 border-b py-2">
            <span className="text-muted-foreground">Loan ID</span>
            <span className="col-span-2 font-medium">
              {application?.loanId}
            </span>
          </div>
          <div className="grid grid-cols-3 border-b py-2">
            <span className="text-muted-foreground">Interest Rate</span>
            <span className="col-span-2 font-medium">
              {application?.interestRate}%
            </span>
          </div>
          <div className="grid grid-cols-3 py-2">
            <span className="text-muted-foreground">Loan Amount</span>
            <span className="col-span-2 font-medium">
              {application?.loanAmount}
            </span>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Applicant Information</h3>
          <div className="grid grid-cols-3 border-b py-2">
            <span className="text-muted-foreground">
              {application?.firstName}
            </span>
            <span className="col-span-2 font-medium">Abdullah Al</span>
          </div>
          <div className="grid grid-cols-3 border-b py-2">
            <span className="text-muted-foreground">Last Name</span>
            <span className="col-span-2 font-medium">
              {application?.lastName}
            </span>
          </div>
          <div className="grid grid-cols-3 border-b py-2">
            <span className="text-muted-foreground">Email</span>
            <span className="col-span-2 font-medium">
              {application?.userEmail}
            </span>
          </div>
          <div className="grid grid-cols-3 py-2">
            <span className="text-muted-foreground">Contact</span>
            <span className="col-span-2 font-medium">
              {application?.contactNumber}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDeatails;
