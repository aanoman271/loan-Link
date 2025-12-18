import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router";
import Navbar from "../components/header/Navbar";
import Fotter from "../components/fotter/Fotter";

import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useSecureInstance";
import useSwal from "../Hooks/useSwal";

const DashBoardLayout = () => {
  const { user } = useAuth();
  const { err } = useSwal();
  const [dbUser, setDbUser] = useState();
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    const fetch = async () => {
      try {
        const promise = await axiosSecure.get("/user");

        setDbUser(promise.data);
      } catch (error) {
        err(error.response.message);
      }
    };
    fetch();
  }, [user]);
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
      { name: "Dashboard", to: "/dashboard" },
      { name: "Manage Users", to: "/dashboard/manage-users" },
      { name: "Manage Loans", to: "/dashboard/manage-loans" },
      { name: "Profile", to: "/dashboard" },
    ],
  };
  const links = roleLinks[role] || [];
  return (
    <>
      {" "}
      <Navbar></Navbar>
      <div className="min-h-screen flex bg-gray-100">
        {/* SIDEBAR */}
        <aside className="w-64 bg-[#172358] text-white hidden gap-3 md:flex flex-col">
          <div className="p-6 text-2xl font-bold bg-blue-900">LoanDash</div>

          <ul className="flex flex-col gap-4 px-5">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-blue-700 text-gray-300 btn py-2 rounded w-full"
                      : "bg-blue-500 border-0 text-white btn w-full py-2 rounded"
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="p-4 border-t border-blue-800"></div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
      <Fotter></Fotter>{" "}
    </>
  );
};

export default DashBoardLayout;
