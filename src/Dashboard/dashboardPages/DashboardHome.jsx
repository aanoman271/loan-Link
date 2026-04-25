import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useSecureInstance";
import DashboardStats from "../../components/DashboardStats";
import DashboardCharts from "../../components/DashboardCharts";
import DashboardActivityTable from "../../components/DashboardActivityTable";

const DashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [dbUser, setDbUser] = useState(null);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await axiosSecure.get("/user");
        setDbUser(userRes.data);

        let statsRes;
        if (userRes.data.role === "Manager") {
          statsRes = await axiosSecure.get("/dashboard/manager-stats");
        } else if (userRes.data.role === "Admin") {
          statsRes = await axiosSecure.get("/dashboard/admin-stats");
        } else {
          statsRes = await axiosSecure.get("/dashboard/borrower-stats");
        }
        setStats(statsRes.data);
      } catch (err) {
        console.error("Dashboard data fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchData();
  }, [user, axiosSecure]);

  const role = dbUser?.role;

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-10 w-64 bg-base-300 rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-base-300 rounded-2xl" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-[400px] bg-base-300 rounded-2xl" />
          <div className="h-[400px] bg-base-300 rounded-2xl" />
        </div>
        <div className="h-64 bg-base-300 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome Section */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-sm text-base-content/40 flex items-center gap-2 mb-1">
            <span>Pages</span>
            <span>/</span>
            <span className="text-base-content/70">Dashboard</span>
          </div>
          <h1 className="text-3xl font-bold text-base-content">
            Dashboard Overview
          </h1>
          <p className="text-base-content/50 mt-1">
            Hello, <span className="text-primary font-semibold">{user?.displayName || "User"}</span>! Here's what's happening today.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
           <button className="btn btn-outline btn-primary rounded-xl px-6">Download Report</button>
           <button className="btn btn-primary rounded-xl px-6 shadow-lg shadow-primary/20">New Application</button>
        </div>
      </div>

      {/* Stats Cards */}
      <DashboardStats stats={stats} role={role} />

      {/* Charts Section */}
      <DashboardCharts />

      {/* Activity Table */}
      <DashboardActivityTable role={role} />

      {/* Contextual Tip for Borrowers */}
      {role === "Borrower" && (
        <div className="mt-8 bg-gradient-to-r from-primary to-secondary p-8 rounded-3xl text-white relative overflow-hidden group shadow-xl">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">Need a new loan?</h3>
            <p className="text-white/80 max-w-md">
              Apply for a new loan today and get approved within 24 hours. Our rates are now 2% lower for premium members!
            </p>
            <button className="btn bg-white text-primary hover:bg-white/90 border-none rounded-xl mt-6">
              Apply Now
            </button>
          </div>
          {/* Decorative element */}
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
