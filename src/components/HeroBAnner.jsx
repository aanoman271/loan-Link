import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import heroImg from "../assets/Loan-underwriting-automation-1.webp";

const HeroBAnner = () => {
  return (
    <section className="relative overflow-hidden bg-base-100 py-16 lg:py-24">
      {/* Background Blobs */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-secondary/10 rounded-full blur-3xl opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-base-content leading-tight">
              Empowering Your <br />
              <span className="text-primary">Financial</span> <span className="text-secondary">Future</span>
            </h1>
            <p className="mt-6 text-lg text-base-content/70 max-w-xl leading-relaxed">
              LoanLink provides fast, secure, and transparent microloan solutions. 
              Get the support you need to grow your business or manage unexpected expenses with ease.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/laonApplication"
                className="px-8 py-4 bg-primary hover:bg-primary-focus text-white font-bold rounded-xl shadow-premium transition-all transform hover:scale-105"
              >
                Apply for Loan
              </Link>
              <Link
                to="/allLoan"
                className="px-8 py-4 bg-base-200 hover:bg-base-300 text-base-content font-bold rounded-xl transition-all border border-base-content/5"
              >
                Explore Loans
              </Link>
            </div>
          </motion.div>

          {/* Image Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-3xl blur-2xl animate-pulse"></div>
            <div className="relative z-10 p-4 bg-base-100/50 backdrop-blur-sm rounded-3xl border border-base-content/5 shadow-2xl">
              <img
                src={heroImg}
                alt="Financial Support"
                className="w-full h-auto rounded-2xl object-cover"
              />
            </div>
            {/* Floating Badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 bg-base-100 p-4 rounded-2xl shadow-premium border border-base-content/5 flex items-center gap-3 z-20"
            >
              <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center text-success text-xl">
                ✓
              </div>
              <div>
                <p className="text-sm font-bold">Fast Approval</p>
                <p className="text-xs text-base-content/60">Within 24 Hours</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroBAnner;
