import React, { useEffect, useState } from "react";
import { FaUserCheck, FaHandHoldingUsd, FaAward, FaGlobeAmericas } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import useInstance from "../Hooks/useInstance";
import { formatNumberShort } from "../utils/formatNumber";

const Stats = () => {
  const instance = useInstance();
  const [statsSummary, setStatsSummary] = useState({ paid: 0, unpaid: 0, sumOfAmount: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApprovedLoan = async () => {
      try {
        setLoading(true);
        const res = await instance.get("/approvedLoan-count");
        setStatsSummary(res.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedLoan();
  }, [instance]);

  const stats = [
    {
      id: 1,
      icon: <FaHandHoldingUsd />,
      value: ` ৳  ${formatNumberShort(statsSummary.sumOfAmount || 0)}`,
      label: "Loans Disbursed",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      trend: "+5.2%",
    },
    {
      id: 2,
      icon: <FaUserCheck />,
      value: formatNumberShort(statsSummary.paid || 0),
      label: "Happy Customers",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      trend: "+12%",
    },
    {
      id: 3,
      icon: <FaGlobeAmericas />,
      value: "45+",
      label: "Countries Reached",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      id: 4,
      icon: <FaAward />,
      value: "15+",
      label: "Fintech Awards",
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
  ];

  return (
    <section className="py-20 bg-base-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4 tracking-tight">
            Trusted by <span className="text-primary relative inline-block">
              Millions
              <span className="absolute bottom-1 left-0 w-full h-2 bg-primary/10 -z-10 rounded-full"></span>
            </span> Globally
          </h2>
          <p className="text-base-content/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Our numbers speak for themselves. We're committed to transparency and excellence in every transaction.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {loading
            ? Array(4).fill(0).map((_, i) => (
              <div key={i} className="p-8 rounded-3xl border border-base-content/5 bg-base-100/50 animate-pulse">
                <div className="w-16 h-16 bg-base-content/5 rounded-2xl mx-auto mb-6"></div>
                <div className="h-10 w-24 bg-base-content/5 rounded-lg mx-auto mb-3"></div>
                <div className="h-4 w-32 bg-base-content/5 rounded-md mx-auto"></div>
              </div>
            ))
            : stats.map((stat) => (
              <div
                key={stat.id}
                className="relative p-8 rounded-3xl border border-base-content/5 glass hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 transform hover:-translate-y-2 text-center group cursor-default"
              >
                {/* Accent background */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 rounded-3xl bg-gradient-to-br from-transparent via-transparent to-${stat.color.split('-')[1]}-500/5`}></div>

                <div
                  className={`w-16 h-16 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-sm`}
                >
                  {stat.icon}
                </div>

                <div className="flex flex-col items-center gap-1">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-base-content tracking-tighter">
                    {stat.value}
                  </h3>

                  {stat.trend && (
                    <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full mb-1">
                      <FaArrowTrendUp size={10} />
                      {stat.trend}
                    </div>
                  )}
                </div>

                <p className="text-base-content/50 font-semibold text-sm uppercase tracking-wider mt-2 group-hover:text-base-content/70 transition-colors">
                  {stat.label}
                </p>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  );
};

export default Stats;
