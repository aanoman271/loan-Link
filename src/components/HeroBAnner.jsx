import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
// import heroImg from "../assets/hero.png";
import heroBg from "../assets/bg-hero-3.jpg";
import Button from "../reuseabble/Button";

const HeroBAnner = () => {
  return (
    <section className="relative min-h-screen   py-12 sm:py-16 lg:py-24 opacity-80">
      <div
        className="absolute inset-0 bg-cover bg-center bg-secondary-content opacity-15"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      {/* Background Blobs */}
      <div className="absolute   inset-0  top-0 right-0 -translate-y-1/2 translate-x-1/2 w-72 h-72 sm:w-96 sm:h-96  rounded-full blur-3xl opacity-50"></div>
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
              Apply & get funded
            </div>
            <h1 className="flex flex-col gap-3 text-4xl md:text-5xl lg:text-6xl font-black tracking-tight  text-app-text leading-[1.1]">
              Small loans <br className="hidden sm:block" />
              <span className="text-primary italic text-3xl md:text-4xl lg:text-5xl ">
                Big relief.
              </span>{" "}
              <span className="text-secondary">Zero hassle</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg lg:text-xl text-app-text-secondary max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              LoanLink provides fast, secure, and transparent microloan
              solutions. Get the support you need to grow your business or
              manage unexpected expenses with ease.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link to="/allLoan">
                <Button className="cursor-pointer bg-primary hover:bg-primary/94 hover:text-app-text-muted text-app-text-inverse">
                  Explore Plans
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button className="cursor-pointer text-app-text  outline-app-border-subtle bg-app-surface outline-1   hover:text-app-text-muted   ">
                  How It Works
                </Button>
              </a>
              {/* <Link
                to="/allLoan"
                className="w-full sm:w-auto px-10 py-5 bg-app-surface-hover hover:bg-base-300 text-app-text font-black rounded-2xl transition-all border border-app-border-subtle active:scale-95 text-lg"
              >
              </Link> */}
            </div>
          </motion.div>

          {/* hero card content */}

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative px-4 sm:px-0"
          >
            <div className="absolute inset-0    sm:rounded-[3rem] blur-3xl animate-pulse"></div>

            <div className="relative z-10 p-2 sm:p-4  ">
              <div className=" p-5 sm:p-7">
                {/* Managers */}
                <motion.div
                  initial={{ opacity: 0, y: -16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border border-gray-100 bg-gray-50/60 p-4 dark:border-white/10 dark:bg-white/5"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="7" width="18" height="13" rx="2" />
                        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        Managers
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Post loan offers with clear terms
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["Set amount", "Set interest", "Review applicants"].map(
                      (t) => (
                        <span
                          key={t}
                          className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary"
                        >
                          {t}
                        </span>
                      ),
                    )}
                  </div>
                </motion.div>

                {/* connector 1 */}
                <div className="relative mx-auto h-10 w-px bg-gradient-to-b from-primary/10 via-primary/50 to-primary/10">
                  <motion.span
                    className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-primary"
                    animate={{ top: ["0%", "100%"] }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </div>

                {/* hub */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="relative mx-auto flex h-20 w-20 items-center justify-center"
                >
                  <span className="absolute inset-0 animate-ping rounded-3xl bg-primary/20" />
                  <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-white shadow-xl shadow-primary/30">
                    LL
                  </span>
                </motion.div>

                {/* connector 2 */}
                <div className="relative mx-auto h-10 w-px bg-gradient-to-b from-primary/10 via-primary/50 to-primary/10">
                  <motion.span
                    className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-primary"
                    animate={{ top: ["0%", "100%"] }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "linear",
                      delay: 0.9,
                    }}
                  />
                </div>

                {/* Borrowers */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border border-gray-100 bg-gray-50/60 p-4 dark:border-white/10 dark:bg-white/5"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 21v-1a6 6 0 0 1 12 0v1" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        Borrowers
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Find a loan that fits and apply
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["Browse offers", "Compare terms", "Apply in minutes"].map(
                      (t) => (
                        <span
                          key={t}
                          className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary"
                        >
                          {t}
                        </span>
                      ),
                    )}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-2 top-10 z-20 hidden items-center gap-2 rounded-2xl border border-gray-100 bg-white px-3 py-2 text-xs font-medium text-gray-900 shadow-lg dark:border-white/10 dark:bg-app-surface dark:text-white sm:flex lg:-right-6"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 text-emerald-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              Zero hidden fees
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroBAnner;
