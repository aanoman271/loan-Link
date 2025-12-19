import React, { useEffect, useState } from "react";
import useInstance from "../Hooks/useInstance";
import LoanCard from "../components/LoanCard";

const AllLoan = () => {
  const instance = useInstance();

  const [loans, setLoans] = useState([]);
  const [totalLoan, setTotalLoan] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchLoans = async () => {
      const res = await instance.get(
        `/allLoans?page=${currentPage - 1}&size=${perPage}`
      );
      setLoans(res.data.loanCollection);
      setTotalLoan(res.data.totalloan);
    };
    fetchLoans();
  }, [instance, currentPage, perPage]);

  const totalPages = Math.ceil(totalLoan / perPage);
  const pages = [...Array(totalPages).keys()].map((n) => n + 1);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">All Loans</h2>

      {loans.length === 0 ? (
        <p className="text-center text-gray-500">No loans available.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loans.map((loan) => (
            <LoanCard key={loan._id} loan={loan} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-8">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="btn"
        >
          Prev
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`btn ${
              page === currentPage ? "bg-blue-600 text-white" : ""
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="btn"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllLoan;
