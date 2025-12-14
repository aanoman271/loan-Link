import React, { useEffect, useState } from "react";
import useInstance from "../Hooks/useInstance";
import { Link } from "react-router";

const AllLoan = () => {
  const instance = useInstance();
  const [loans, setLaons] = useState([]);
  useEffect(() => {
    const fetchLaons = async () => {
      const Promise = await instance.get("/alllaons");
      setLaons(Promise.data);
    };
    fetchLaons();
  }, []);
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">All Loans</h2>

      {loans.length === 0 ? (
        <p className="text-center text-gray-500">No loans available.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loans.map((loan) => (
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
                  <span className="font-medium">Category:</span>{" "}
                  {loan?.category}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Interest:</span>{" "}
                  {loan?.interestRate}%
                </p>
                <p className="text-gray-600 mb-4">
                  <span className="font-medium">Max Limit:</span> $
                  {loan?.maxLimit}
                </p>

                <Link
                  to={`/loan/${loan._id}`}
                  className="inline-block w-full text-center bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllLoan;
