import React from "react";

const LoanCard = ({ loan }) => {
  return (
    <div
      key={loan._id}
      className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <img
        src={loan?.photoUrl || "https://via.placeholder.com/400x200"}
        alt={loan?.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h3 className="text-xl font-semibold mb-1">{loan?.title}</h3>
        <p className="text-gray-600 mb-1">
          <span className="font-medium">Category:</span> {loan?.category}
        </p>
        <p className="text-gray-600 mb-1">
          <span className="font-medium">Interest:</span> {loan?.interestRate}%
        </p>
        <p className="text-gray-600 mb-4">
          <span className="font-medium">Max Limit:</span> ${loan?.maxLimit}
        </p>

        <Link
          to={`/loanDeatails/${loan?._id}`}
          className="inline-block w-full text-center bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default LoanCard;
