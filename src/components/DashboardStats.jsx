import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const StatCard = ({ title, value, icon, trend, trendValue, colorClass }) => {
  return (
    <div className="card-modern p-6 flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div className={`p-3 rounded-2xl ${colorClass} bg-opacity-10 text-xl shadow-sm`}>
          {icon}
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${
            trend === 'up' ? 'text-success bg-success/10' : 'text-error bg-error/10'
          }`}>
            {trend === 'up' ? <FaArrowUp /> : <FaArrowDown />}
            {trendValue}%
          </div>
        )}
      </div>
      <div>
        <p className="text-base-content/50 text-sm font-medium uppercase tracking-wider">{title}</p>
        <h3 className="text-3xl font-bold mt-1 text-base-content">{value}</h3>
      </div>
      <div className="pt-2">
        <div className="w-full bg-base-200 h-1.5 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full ${colorClass.split(' ')[0]}`} 
            style={{ width: '65%' }} 
          />
        </div>
      </div>
    </div>
  );
};

const DashboardStats = ({ stats, role }) => {
  const getAdminStats = () => [
    { title: "Total Users", value: stats.totalUsers || 0, icon: "👥", trend: "up", trendValue: 12, colorClass: "bg-blue-500 text-blue-600" },
    { title: "Active Loans", value: stats.totalLoans || 0, icon: "📄", trend: "up", trendValue: 8, colorClass: "bg-green-500 text-green-600" },
    { title: "Total Revenue", value: `$${stats.totalAmount || 0}`, icon: "💰", trend: "down", trendValue: 3, colorClass: "bg-purple-500 text-purple-600" },
    { title: "System Health", value: "99.9%", icon: "⚡", trend: "up", trendValue: 0.1, colorClass: "bg-orange-500 text-orange-600" },
  ];

  const getManagerStats = () => [
    { title: "Pending Loans", value: stats.pendingLoans || 0, icon: "⏳", trend: "up", trendValue: 15, colorClass: "bg-orange-500 text-orange-600" },
    { title: "Approved Today", value: stats.approvedLoans || 0, icon: "✅", trend: "up", trendValue: 24, colorClass: "bg-green-500 text-green-600" },
    { title: "Processed", value: stats.totalProcessed || 0, icon: "📂", trend: "up", trendValue: 5, colorClass: "bg-blue-500 text-blue-600" },
    { title: "Today's Volume", value: `$${stats.todayAmount || 0}`, icon: "💵", trend: "down", trendValue: 2, colorClass: "bg-purple-500 text-purple-600" },
  ];

  const getBorrowerStats = () => [
    { title: "Active Loans", value: stats.activeLoans || 0, icon: "📄", trend: "none", colorClass: "bg-blue-500 text-blue-600" },
    { title: "Pending", value: stats.pendingApplications || 0, icon: "⏳", trend: "none", colorClass: "bg-orange-500 text-orange-600" },
    { title: "Total Borrowed", value: `$${stats.totalBorrowed || 0}`, icon: "💰", trend: "up", trendValue: 10, colorClass: "bg-green-500 text-green-600" },
    { title: "Credit Score", value: "720", icon: "⭐", trend: "up", trendValue: 5, colorClass: "bg-purple-500 text-purple-600" },
  ];

  const displayStats = role === "Admin" ? getAdminStats() : role === "Manager" ? getManagerStats() : getBorrowerStats();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {displayStats.map((stat, idx) => (
        <StatCard key={idx} {...stat} />
      ))}
    </div>
  );
};

export default DashboardStats;
