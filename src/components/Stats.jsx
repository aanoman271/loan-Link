import React from "react";
import { FaUserCheck, FaHandHoldingUsd, FaAward, FaGlobeAmericas } from "react-icons/fa";

const Stats = () => {
  const stats = [
    {
      id: 1,
      icon: <FaHandHoldingUsd />,
      value: "$2.5B+",
      label: "Loans Disbursed",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      id: 2,
      icon: <FaUserCheck />,
      value: "1.2M+",
      label: "Happy Customers",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
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
          <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4">
            Trusted by <span className="text-primary">Millions</span> Globally
          </h2>
          <p className="text-base-content/60 text-lg max-w-2xl mx-auto">
            Our numbers speak for themselves. We're committed to transparency and excellence in every transaction.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="p-8 rounded-3xl border border-base-content/5 glass hover:shadow-premium transition-all transform hover:-translate-y-1 text-center group"
            >
              <div
                className={`w-16 h-16 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6 group-hover:scale-110 transition-transform`}
              >
                {stat.icon}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-base-content mb-2">
                {stat.value}
              </h3>
              <p className="text-base-content/50 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
