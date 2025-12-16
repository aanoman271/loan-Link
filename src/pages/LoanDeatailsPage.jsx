import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import useAxiosSecure from "../Hooks/useSecureInstance";
const LoanDetailsPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loan, setLoan] = useState(null);
  useEffect(() => {
    const fetchLoan = async () => {
      try {
        const res = await axiosSecure.get(`/loanDeatails/${id}`);
        setLoan(res.data);
      } catch (error) {
        console.error(error);
        navigate("/all-loans");
      }
    };

    fetchLoan();
  }, [id]);

  if (!loan) {
    return <p className="text-center mt-10">Loading loan details...</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center">
      <div className="bg-white rounded-2xl shadow-lg max-w-4xl w-full overflow-hidden">
        {/* Loan Image */}
        <img
          src={loan?.photoUrl}
          alt={loan?.title}
          className="w-full h-64 object-cover"
        />

        {/* Loan Details */}
        <div className="p-6 space-y-4">
          <h1 className="text-3xl font-bold">{loan?.title}</h1>
          <p className="text-gray-700">{loan?.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <p>
              <span className="font-medium">Category:</span> {loan?.category}
            </p>
            <p>
              <span className="font-medium">Interest Rate:</span>{" "}
              {loan?.interestRate}%
            </p>
            <p>
              <span className="font-medium">Max Limit:</span> ${loan?.maxLimit}
            </p>
            <p>
              <span className="font-medium">Available EMI Plans:</span>{" "}
              {loan?.emiPlans} month
            </p>
          </div>

          {/* Apply Now Button */}

          <button
            onClick={() =>
              navigate("/laonApplication", {
                state: {
                  interestRate: loan?.interestRate,
                  title: loan?.title,
                  loanId: loan?._id,
                },
              })
            }
            className="w-full bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 transition-colors"
          >
            {" "}
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoanDetailsPage;
