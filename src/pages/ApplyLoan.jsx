import React from "react";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useSecureInstance";
import useSwal from "../Hooks/useSwal";

const ApplyLoan = () => {
  const { state } = useLocation();
  const { user } = useAuth();
  const instance = useAxiosSecure();
  const navigate = useNavigate();
  const { success, err } = useSwal();
  const { interestRate, loanId, title } = state;
  console.log(interestRate, loanId, title);

  const handleApply = async (e) => {
    e.preventDefault();
    const form = e.target;

    const applicationData = {
      userEmail: user?.email,
      loanId,
      loanTitle: title,
      interestRate: interestRate,

      firstName: form.firstName.value,
      lastName: form.lastName.value,
      contactNumber: form.contactNumber.value,
      nationalId: form.nationalId.value,
      incomeSource: form.incomeSource.value,
      monthlyIncome: form.monthlyIncome.value,
      loanAmount: form.loanAmount.value,
      reason: form.reason.value,
      address: form.address.value,
      notes: form.notes.value,
      status: "pending",
    };
    try {
      await instance.post("/loan-applications", applicationData);
      success("Loan application submitted successfully");
      navigate(`/loanDeatail/${loanId}`);
    } catch (error) {
      err(error.response?.data?.message);
    }
  };

  return (
    <div className="max-w-[800px] mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Loan Application</h2>

      <form onSubmit={handleApply} className="space-y-4">
        {/* Read-only */}
        <input value={user?.email} readOnly className="input" />
        <input value={title} readOnly className="input" />
        <input value={interestRate} readOnly className="input" />

        {/* User Inputs */}
        <input
          name="firstName"
          placeholder="First Name"
          required
          className="input"
        />
        <input
          name="lastName"
          placeholder="Last Name"
          required
          className="input"
        />
        <input
          name="contactNumber"
          placeholder="Contact Number"
          required
          className="input"
        />
        <input
          name="nationalId"
          placeholder="National ID / Passport"
          required
          className="input"
        />
        <input
          name="incomeSource"
          placeholder="Income Source"
          required
          className="input"
        />
        <input
          name="monthlyIncome"
          type="number"
          placeholder="Monthly Income"
          required
          className="input"
        />
        <input
          name="loanAmount"
          type="number"
          placeholder="Loan Amount"
          required
          className="input"
        />

        <textarea
          name="reason"
          placeholder="Reason for Loan"
          required
          className="textarea"
        />
        <textarea
          name="address"
          placeholder="Address"
          required
          className="textarea"
        />
        <textarea name="notes" placeholder="Extra Notes" className="textarea" />

        <button type="submit" className="btn btn-primary w-full">
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default ApplyLoan;
