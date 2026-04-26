import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const LoanCard = ({ loan }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group bg-base-100 rounded-2xl shadow-premium border border-base-content/5 overflow-hidden transition-all duration-300 flex flex-col h-full"
    >
      {/* Image Wrapper */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={loan?.photoUrl || "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop"}
          alt={loan?.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          {loan?.interestRate}% APR
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-base-content mb-2 group-hover:text-primary transition-colors">
            {loan?.title}
          </h3>
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2 py-1 bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-wider rounded">
              {loan?.category}
            </span>
          </div>

          <div className="space-y-2 text-sm text-base-content/60">
            <div className="flex justify-between items-center">
              <span>Max Limit</span>
              <span className="font-bold text-base-content">${loan?.maxLimit?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Duration</span>
              <span className="font-medium text-base-content">${loan?.emiPlans} Months</span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Link
            to={`/loanDeatail/${loan?._id}`}
            className="block w-full text-center bg-primary hover:bg-primary-focus text-white font-bold py-3 rounded-xl transition-all shadow-md hover:shadow-lg transform active:scale-95"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default LoanCard;
