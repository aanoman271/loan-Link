import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import Navbar from "../components/header/Navbar";
import Fotter from "../components/fotter/Fotter";

const DashBoardLayout = () => {
  const Links = (
    <>
      <li className="w-full">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            isActive
              ? "bg-blue-700 text-gray-300 btn  py-2 rounded w-full"
              : "bg-blue-500 border-0 text-white btn w-full py-2 rounded "
          }
        >
          Add Loan
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/manage-loans"
          className={({ isActive }) =>
            isActive
              ? "bg-blue-700 text-gray-300 btn  py-2 rounded w-full"
              : "bg-blue-500 border-0 text-white btn w-full py-2 rounded "
          }
        >
          Manage Loans
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/pending-loan"
          className={({ isActive }) =>
            isActive
              ? "bg-blue-700 text-gray-300 btn  py-2 rounded w-full"
              : "bg-blue-500 border-0 text-white btn w-full py-2 rounded "
          }
        >
          Pending Applications
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/approvedAppManager"
          className={({ isActive }) =>
            isActive
              ? "bg-blue-700 text-gray-300 btn  py-2 rounded w-full"
              : "bg-blue-500 border-0 text-white btn w-full py-2 rounded "
          }
        >
          Approved Applications
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/managerProfile"
          className={({ isActive }) =>
            isActive
              ? "bg-blue-700 text-gray-300 btn  py-2 rounded w-full"
              : "bg-blue-500 border-0 text-white btn w-full py-2 rounded "
          }
        >
          Profile
        </NavLink>
      </li>
    </>
  );
  return (
    <>
      {" "}
      <Navbar></Navbar>
      <div className="min-h-screen flex bg-gray-100">
        {/* SIDEBAR */}
        <aside className="w-64 bg-[#172358] text-white hidden gap-3 md:flex flex-col">
          <div className="p-6 text-2xl font-bold bg-blue-900">LoanDash</div>

          <ul className="flex flex-col gap-4 px-5">{Links}</ul>

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
