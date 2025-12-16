import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useSecureInstance";
import useSwal from "../../../Hooks/useSwal";

const LoanApplicationDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { err } = useSwal();

  const [application, setApplication] = useState(null);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const res = await axiosSecure.get(`/loan-application/${id}`);
        setApplication(res.data);
      } catch (error) {
        err(error.message || "Failed to load application details");
      }
    };

    fetchApplication();
  }, [id]);
  console.log(application);

  if (!application) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Loan Application Details
      </h2>

      <div className="bg-white rounded-xl shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Loan Info */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Loan Info</h3>
          <p>
            <strong>Loan Title:</strong> {application.loanTitle}
          </p>
          <p>
            <strong>Loan ID:</strong> {application.loanId}
          </p>
          <p>
            <strong>Interest Rate:</strong> {application.interestRate}%
          </p>
          <p>
            <strong>Loan Amount:</strong> ৳ {application.loanAmount}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span className="capitalize">{application.status}</span>
          </p>
        </div>

        {/* Borrower Info */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Borrower Info</h3>
          <p>
            <strong>Name:</strong> {application.firstName}{" "}
            {application.lastName}
          </p>
          <p>
            <strong>Email:</strong> {application.userEmail}
          </p>
          <p>
            <strong>Contact:</strong> {application.contactNumber}
          </p>
          <p>
            <strong>National ID:</strong> {application.nationalId}
          </p>
        </div>

        {/* Financial Info */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Financial Info</h3>
          <p>
            <strong>Income Source:</strong> {application.incomeSource}
          </p>
          <p>
            <strong>Monthly Income:</strong> ৳ {application.monthlyIncome}
          </p>
          <p>
            <strong>Reason:</strong> {application.reason}
          </p>
        </div>

        {/* Address & Notes */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Address & Notes</h3>
          <p>
            <strong>Address:</strong> {application.address}
          </p>
          <p>
            <strong>Extra Notes:</strong> {application.notes || "N/A"}
          </p>
          <p>
            <strong>Assigned Officer:</strong> {application.Officer_email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoanApplicationDetails;
