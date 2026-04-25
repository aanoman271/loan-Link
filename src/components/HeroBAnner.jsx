import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import heroImg from "../assets/Loan-underwriting-automation-1.webp";

const HeroBAnner = () => {
  return (
    <section className="relative overflow-hidden bg-base-100 py-12 sm:py-16 lg:py-24">
      {/* Background Blobs */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-secondary/10 rounded-full blur-3xl opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
               <span className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
               </span>
               Trusted by 2M+ Users
            </div>
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight text-base-content leading-[1.1]">
              Empowering Your <br className="hidden sm:block" />
              <span className="text-primary italic">Financial</span> <span className="text-secondary">Future</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg lg:text-xl text-base-content/60 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              LoanLink provides fast, secure, and transparent microloan solutions. 
              Get the support you need to grow your business or manage unexpected expenses with ease.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/laonApplication"
                className="w-full sm:w-auto px-10 py-5 bg-primary hover:bg-primary-focus text-white font-black rounded-2xl shadow-premium transition-all transform hover:scale-105 active:scale-95 text-lg"
              >
                Apply Now
              </Link>
              <Link
                to="/allLoan"
                className="w-full sm:w-auto px-10 py-5 bg-base-200 hover:bg-base-300 text-base-content font-black rounded-2xl transition-all border border-base-content/5 active:scale-95 text-lg"
              >
                Explore Plans
              </Link>
            </div>
          </motion.div>

          {/* Image Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative px-4 sm:px-0"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-secondary/20 rounded-[2rem] sm:rounded-[3rem] blur-3xl animate-pulse"></div>
            <div className="relative z-10 p-2 sm:p-4 bg-white/30 dark:bg-base-100/30 backdrop-blur-md rounded-[2.5rem] border border-white/20 dark:border-white/5 shadow-2xl">
              <img
                src={heroImg}
                alt="Financial Support"
                className="w-full h-auto rounded-[2rem] object-cover shadow-inner"
              />
            </div>
            
            {/* Floating Stats Badge */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-2 sm:-left-10 bg-base-100 p-5 rounded-3xl shadow-premium border border-base-content/5 flex items-center gap-4 z-20"
            >
              <div className="w-12 h-12 bg-success/20 rounded-2xl flex items-center justify-center text-success text-2xl shadow-inner">
                ✓
              </div>
              <div>
                <p className="text-sm font-black text-base-content leading-none">Fast Approval</p>
                <p className="text-xs text-base-content/40 mt-1 font-bold">Within 24 Hours</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroBAnner;
