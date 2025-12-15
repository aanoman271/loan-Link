import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useInstance from "../Hooks/useInstance";
import LoanCard from "../components/LoanCard";

const AllLoan = () => {
  const instance = useInstance();
  const [loans, setLaons] = useState([]);
  useEffect(() => {
    const fetchLaons = async () => {
      const Promise = await instance.get("/alllaons");
      setLaons(Promise.data);
    };
    fetchLaons();
  }, [instance]);
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">All Loans</h2>

      {loans.length === 0 ? (
        <p className="text-center text-gray-500">No loans available.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loans.map((loan) => (
            <LoanCard loan={loan}></LoanCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllLoan;
