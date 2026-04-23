import React, { useEffect, useState } from "react";
import useInstance from "../Hooks/useInstance";
import LoanCard from "../components/LoanCard";
import { motion } from "framer-motion";
import { FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const AllLoan = () => {
  const instance = useInstance();

  const [loans, setLoans] = useState([]);
  const [totalLoan, setTotalLoan] = useState(0);
  const [perPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await instance.get(
          `/allLoans?page=${currentPage - 1}&size=${perPage}`
        );
        setLoans(res.data.loanCollection || []);
        setTotalLoan(res.data.totalloan || 0);
      } catch (error) {
        console.error("Error fetching loans:", error);
      }
    };
    fetchLoans();
  }, [instance, currentPage, perPage]);

  const filteredLoans = loans.filter((loan) =>
    loan.title?.toLowerCase().includes(search.toLowerCase()) ||
    loan.category?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(totalLoan / perPage);
  const pages = [...Array(totalPages).keys()].map((n) => n + 1);

  return (
    <div className="bg-base-200 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-4xl font-extrabold text-base-content">
              Explore <span className="text-primary">All Loans</span>
            </h2>
            <p className="text-base-content/60 mt-2">Find the perfect financial solution for your needs.</p>
          </motion.div>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative w-full md:w-96"
          >
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by title or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-base-100 border border-base-content/5 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
            />
          </motion.div>
        </div>

        {/* Content Section */}
        {filteredLoans.length === 0 ? (
          <div className="text-center py-20 bg-base-100 rounded-3xl border border-dashed border-base-content/10">
            <p className="text-lg text-base-content/50">No loans found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredLoans.map((loan, index) => (
              <LoanCard key={loan._id} loan={loan} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-16">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-3 rounded-xl bg-base-100 hover:bg-base-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all border border-base-content/5"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {pages.map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-12 h-12 rounded-xl font-bold transition-all ${
                    page === currentPage
                      ? "bg-primary text-white shadow-lg shadow-primary/20"
                      : "bg-base-100 hover:bg-base-300 border border-base-content/5"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-3 rounded-xl bg-base-100 hover:bg-base-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all border border-base-content/5"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllLoan;
