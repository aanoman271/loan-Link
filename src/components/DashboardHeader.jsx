import React from "react";
import { FaSearch, FaBell, FaChevronDown } from "react-icons/fa";
import useAuth from "../Hooks/useAuth";
import avatar from "../assets/Tech Life - Add User.png";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
import { useTheme } from "../provider/ThemeContext";

const DashboardHeader = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-20 bg-base-100/80 backdrop-blur-md border-b border-base-content/5 sticky top-0 z-30 px-6 flex items-center justify-between">
      {/* Search Bar */}
      <div className="hidden sm:flex items-center gap-3 bg-base-200 px-4 py-2.5 rounded-2xl w-96 group focus-within:ring-2 focus-within:ring-primary/20 transition-all border border-transparent focus-within:border-primary/30">
        <FaSearch className="text-base-content/30 group-focus-within:text-primary transition-colors" />
        <input
          type="text"
          placeholder="Search for loans, users, or transactions..."
          className="bg-transparent border-none outline-none text-sm w-full placeholder:text-base-content/40"
        />
      </div>

      {/* Mobile Logo placeholder or Menu toggle can go here if needed */}
      <div className="md:hidden flex items-center gap-2">
         <span className="font-bold text-lg text-primary">LoanLink</span>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl hover:bg-base-200 transition-colors text-base-content/60 hover:text-primary"
        >
          {theme === "loanlink-dark" ? (
            <IoSunnyOutline className="w-5 h-5" />
          ) : (
            <IoMoonOutline className="w-5 h-5" />
          )}
        </button>

        {/* Notifications */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="p-2.5 rounded-xl hover:bg-base-200 transition-colors text-base-content/60 hover:text-primary relative">
            <FaBell className="w-5 h-5" />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-accent rounded-full border-2 border-base-100" />
          </div>
          <ul tabIndex={0} className="dropdown-content mt-4 z-[1] p-2 shadow-2xl menu menu-sm bg-base-100 rounded-2xl w-80 border border-base-content/5">
             <div className="px-4 py-2 border-b border-base-content/5 mb-1">
                <p className="font-bold">Notifications</p>
             </div>
             <li className="p-2 text-center text-base-content/50">No new notifications</li>
          </ul>
        </div>

        <div className="divider divider-horizontal mx-0 opacity-50 h-8"></div>

        {/* Profile */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="flex items-center gap-3 p-1.5 pr-3 rounded-2xl hover:bg-base-200 transition-all group">
            <img
              src={user?.photoURL || avatar}
              alt="avatar"
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-transparent group-hover:ring-primary/20 transition-all"
            />
            <div className="hidden lg:block text-left">
              <p className="text-sm font-semibold truncate max-w-[100px]">{user?.displayName || "User"}</p>
              <p className="text-[10px] text-base-content/50 uppercase tracking-tighter">Premium Member</p>
            </div>
            <FaChevronDown className="text-[10px] text-base-content/30 group-hover:text-primary transition-colors" />
          </div>
          <ul tabIndex={0} className="dropdown-content mt-4 z-[1] p-2 shadow-2xl menu menu-sm bg-base-100 rounded-2xl w-56 border border-base-content/5">
            <li className="px-4 py-2 pointer-events-none">
                <p className="text-xs text-base-content/40 font-semibold uppercase">Account</p>
                <p className="font-medium truncate">{user?.email}</p>
            </li>
            <div className="divider my-1 opacity-50"></div>
            <li><a>Settings</a></li>
            <li><a>Support</a></li>
            <div className="divider my-1 opacity-50"></div>
            <li><a className="text-error font-medium">Logout</a></li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
