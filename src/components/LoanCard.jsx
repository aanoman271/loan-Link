import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { IoWalletOutline, IoTimeOutline, IoArrowForwardOutline, IoSparklesOutline } from "react-icons/io5";

const LoanCard = ({ loan }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group relative bg-app-surface rounded-3xl shadow-card hover:shadow-card-hover border border-app-border-subtle overflow-hidden transition-all duration-500 flex flex-col h-full"
    >
      {/* Premium Glow Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Image Wrapper */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={loan?.photoUrl || "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop"}
          alt={loan?.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Darker Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

        {/* Floating Category Badge */}
        <div className="absolute top-4 left-4">
          <div className="px-3 py-1.5 rounded-xl bg-accent/50 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-lg">
            {loan?.category}
          </div>
        </div>

        {/* APR Badge */}
        <div className="absolute top-4 right-4 bg-primary px-3 py-1.5 rounded-xl shadow-lg border border-white/10 transform -rotate-2 group-hover:rotate-0 transition-transform duration-300">
          <span className="text-white text-sm font-black tracking-tight">{loan?.interestRate}% APR</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative p-6 flex flex-col flex-grow bg-app-surface/50 backdrop-blur-sm">
        <div className="flex-grow">
          <h3 className="text-3xl font-bold text-app-text mb-3 group-hover:text-primary transition-colors duration-300 leading-tight">
            {loan?.title}
          </h3>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Max Limit */}
            <div className="p-3 rounded-2xl bg-app-surface-hover/50 border border-app-border-subtle group-hover:border-primary/20 transition-colors">
              <div className="flex items-center gap-2 text-app-text-muted mb-1">
                <IoWalletOutline className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Max Limit</span>
              </div>
              <p className="text-lg font-black text-app-text tracking-tight">
                ${loan?.maxLimit?.toLocaleString()}
              </p>
            </div>

            {/* Duration */}
            <div className="p-3 rounded-2xl bg-app-surface-hover/50 border border-app-border-subtle group-hover:border-primary/20 transition-colors">
              <div className="flex items-center gap-2 text-app-text-muted mb-1">
                <IoTimeOutline className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Duration</span>
              </div>
              <p className="text-lg font-black text-app-text tracking-tight">
                {loan?.emiPlans} <span className="text-xs font-medium text-app-text-muted">Months</span>
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-4">
          <Link
            to={`/loanDeatail/${loan?._id}`}
            className="group/btn relative w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/80 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/40 overflow-hidden active:scale-[0.98]"
          >
            <span className="relative z-10">Explore Loan</span>
            <IoArrowForwardOutline className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1" />

            {/* Button Shine Animation */}
            <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-[-25deg] -translate-x-[150%] group-hover/btn:animate-[shine_0.8s_ease-out]" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default LoanCard;

