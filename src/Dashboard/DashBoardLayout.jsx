import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardHeader from "../components/DashboardHeader";

import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useSecureInstance";
import useSwal from "../Hooks/useSwal";
import Lodding from "../components/Lodding";

const DashBoardLayout = () => {
  const { user, authLoadding } = useAuth();
  const { err } = useSwal();
  const [dbUser, setDbUser] = useState();
  const [dbLoading, setDbLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!authLoadding && user) {
      const fetchUserData = async () => {
        try {
          setDbLoading(true);
          const promise = await axiosSecure.get("/user");
          setDbUser(promise.data);
        } catch (error) {
          err(error.response?.data?.message || error.message);
        } finally {
          setDbLoading(false);
        }
      };
      fetchUserData();
    }
  }, [user, authLoadding]);

  const role = dbUser?.role;
  console.log(role);
  const roleLinks = {
    Manager: [
      { name: "Add Loan", to: "/dashboard/add-Loan" },
      { name: "Manage Loans", to: "/dashboard/manage-loans" },
      { name: "Pending Applications", to: "/dashboard/pending-loan" },
      { name: "Approved Applications", to: "/dashboard/approved-loans" },
      { name: "Profile", to: "/dashboard" },
    ],
    Borrower: [
      { name: "My Loans", to: "/dashboard/my-Loan" },
      { name: "Profile", to: "/dashboard" },
    ],
    Admin: [
      { name: "Manage Users", to: "/dashboard/manage-users" },
      { name: "All Loan", to: "/dashboard/manage-allLon" },
      { name: "Loan Applications", to: "/dashboard/manage-application" },
      { name: "Profile", to: "/dashboard" },
    ],
  };
  const links = roleLinks[role] || [];
  if (authLoadding || dbLoading) {
    return <Lodding></Lodding>;
  }

  return (
    <div className="min-h-screen flex bg-base-200">
      {/* SIDEBAR */}
      <DashboardSidebar role={role} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* HEADER */}
        <DashboardHeader />

        {/* MAIN CONTENT */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashBoardLayout;
