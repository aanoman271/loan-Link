import React from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../../Hooks/useSecureInstance";
import { useEffect } from "react";
import { useState } from "react";
import useSwal from "../../../Hooks/useSwal";

const MyLoan = () => {
  const { err } = useSwal();
  const instance = useAxiosSecure();
  const [loan, setLoans] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await instance.get("/myLoan");
        setLoans(res.data);
      } catch (error) {
        err(error.response?.data?.message || "Rejection failed");
      }
    };
    fetch();
  }, [instance]);
  console.log(loan);
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">My Loans</h2>
      </div>
      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table w-full">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Loan id</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Ammount</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loan.length > 0 ? (
              loan.map((loan) => (
                <tr
                  key={loan._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3">{loan?.loanId}</td>
                  <td className="p-3 font-medium text-gray-800">
                    {loan?.loanTitle}
                  </td>
                  <td className="p-3 text-gray-600">{loan?.loanAmount}</td>
                  <td className="p-3">
                    <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-600">
                      {loan?.status}
                    </span>
                  </td>
                  <td className="p-3 text-center space-x-2">
                    <Link
                      to={`/dashboard/applicationDeatails/${loan?._id}`}
                      className="inline-block px-3 py-1 text-sm rounded-md bg-green-500 text-white hover:bg-green-600"
                    >
                      view
                    </Link>
                    <button
                      // onClick={() => handleDelete(loan?._id, loan?.title)}
                      className="px-3 py-1 text-sm rounded-md bg-red-500 text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-500">
                  No loans found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyLoan;
