import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useSecureInstance";
import {
  FaUsers,
  FaFileAlt,
  FaClock,
  FaCheckCircle,
  FaDollarSign,
} from "react-icons/fa";

const DashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [dbUser, setDbUser] = useState(null);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // User role + data from backend
        const userRes = await axiosSecure.get("/user");
        setDbUser(userRes.data);

        // Role-based stats (তোমার backend-এ API বানাতে হবে)
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
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome back, {user?.displayName || "User"}! 👋
        </h1>
        <p className="text-gray-600 mt-2">
          Role:{" "}
          <span className="font-semibold capitalize">{role || "User"}</span>
        </p>
      </div>

      {/* Role-based Content */}
      {role === "Admin" && (
        <div>
          <h2 className="text-2xl font-semibold mb-6">Admin Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center gap-4">
                <FaUsers className="text-4xl text-blue-600" />
                <div>
                  <p className="text-gray-600">Total Users</p>
                  <p className="text-3xl font-bold">{stats.totalUsers || 0}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center gap-4">
                <FaFileAlt className="text-4xl text-green-600" />
                <div>
                  <p className="text-gray-600">Total Loans</p>
                  <p className="text-3xl font-bold">{stats.totalLoans || 0}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center gap-4">
                <FaDollarSign className="text-4xl text-purple-600" />
                <div>
                  <p className="text-gray-600">Total Amount</p>
                  <p className="text-3xl font-bold">
                    ${stats.totalAmount || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {role === "Manager" && (
        <div>
          <h2 className="text-2xl font-semibold mb-6">Manager Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <FaClock className="text-5xl text-orange-500 mx-auto mb-3" />
              <p className="text-gray-600">Pending Loans</p>
              <p className="text-3xl font-bold">{stats.pendingLoans || 0}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <FaCheckCircle className="text-5xl text-green-500 mx-auto mb-3" />
              <p className="text-gray-600">Approved</p>
              <p className="text-3xl font-bold">{stats.approvedLoans || 0}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <FaFileAlt className="text-5xl text-blue-500 mx-auto mb-3" />
              <p className="text-gray-600">Total Processed</p>
              <p className="text-3xl font-bold">{stats.totalProcessed || 0}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <FaDollarSign className="text-5xl text-purple-500 mx-auto mb-3" />
              <p className="text-gray-600">Today's Amount</p>
              <p className="text-3xl font-bold">${stats.todayAmount || 0}</p>
            </div>
          </div>
        </div>
      )}

      {role === "Borrower" && (
        <div>
          <h2 className="text-2xl font-semibold mb-6">My Loan Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <FaFileAlt className="text-4xl text-blue-600 mb-4" />
              <p className="text-gray-600">Active Loans</p>
              <p className="text-3xl font-bold">{stats.activeLoans || 0}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <FaClock className="text-4xl text-orange-600 mb-4" />
              <p className="text-gray-600">Pending Applications</p>
              <p className="text-3xl font-bold">
                {stats.pendingApplications || 0}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <FaDollarSign className="text-4xl text-green-600 mb-4" />
              <p className="text-gray-600">Total Borrowed</p>
              <p className="text-3xl font-bold">${stats.totalBorrowed || 0}</p>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 p-6 rounded-lg">
            <p className="text-lg font-medium text-blue-800">
              💡 Tip: Want a new loan? Go to <strong>Apply Loan</strong> from
              the sidebar.
            </p>
          </div>
        </div>
      )}

      {!role && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">Loading your dashboard...</p>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
