import React from "react";
import { NavLink, Link } from "react-router";
import { 
  FaHome, 
  FaUsers, 
  FaFileAlt, 
  FaClock, 
  FaCheckCircle, 
  FaUserCircle, 
  FaPlusCircle,
  FaTasks
} from "react-icons/fa";
import Logo from "./Logo";

const DashboardSidebar = ({ role }) => {
  const roleLinks = {
    Manager: [
      { name: "Overview", to: "/dashboard", icon: <FaHome /> },
      { name: "Add Loan", to: "/dashboard/add-Loan", icon: <FaPlusCircle /> },
      { name: "Manage Loans", to: "/dashboard/manage-loans", icon: <FaTasks /> },
      { name: "Pending", to: "/dashboard/pending-loan", icon: <FaClock /> },
      { name: "Approved", to: "/dashboard/approved-loans", icon: <FaCheckCircle /> },
    ],
    Borrower: [
      { name: "Overview", to: "/dashboard", icon: <FaHome /> },
      { name: "My Loans", to: "/dashboard/my-Loan", icon: <FaFileAlt /> },
    ],
    Admin: [
      { name: "Overview", to: "/dashboard", icon: <FaHome /> },
      { name: "Manage Users", to: "/dashboard/manage-users", icon: <FaUsers /> },
      { name: "All Loans", to: "/dashboard/manage-allLon", icon: <FaFileAlt /> },
      { name: "Applications", to: "/dashboard/manage-application", icon: <FaTasks /> },
    ],
  };

  const links = roleLinks[role] || [];

  return (
    <aside className="w-64 min-h-screen bg-base-100 border-r border-base-content/5 hidden md:flex flex-col sticky top-0">
      <div className="p-6 border-b border-base-content/5 flex items-center gap-3">
        <Logo />
        <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          LoanLink
        </span>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4">
        <p className="text-xs font-semibold text-base-content/40 uppercase tracking-wider px-4 mb-4">
          Menu
        </p>
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === "/dashboard"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? "bg-primary text-primary-content shadow-lg shadow-primary/20"
                      : "text-base-content/70 hover:bg-base-200 hover:text-primary"
                  }`
                }
              >
                <span className="text-lg">{link.icon}</span>
                <span className="font-medium">{link.name}</span>
                {/* Subtle active indicator */}
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-current opacity-0 group-[.active]:opacity-100" />
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <p className="text-xs font-semibold text-base-content/40 uppercase tracking-wider px-4 mb-4">
            Account
          </p>
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive && location.pathname === '/dashboard/profile'
                      ? "bg-primary text-primary-content shadow-lg shadow-primary/20"
                      : "text-base-content/70 hover:bg-base-200 hover:text-primary"
                  }`
                }
              >
                <FaUserCircle className="text-lg" />
                <span className="font-medium">Profile</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      <div className="p-6 border-t border-base-content/5">
        <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
          <p className="text-xs font-semibold text-primary uppercase">Pro Plan</p>
          <p className="text-sm text-base-content/70 mt-1">Get advanced insights</p>
          <button className="btn btn-primary btn-sm w-full mt-3 rounded-lg">Upgrade</button>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
