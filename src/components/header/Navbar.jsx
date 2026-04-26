import React from "react";
import Logo from "../Logo";
import { Link, NavLink } from "react-router";
import useAuth from "../../Hooks/useAuth";
import avatar from "../../assets/Tech Life - Add User.png";
import { IoReorderThree, IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
import useSwal from "../../Hooks/useSwal";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useTheme } from "../../provider/ThemeContext";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { success, err } = useSwal();
  const { theme, toggleTheme } = useTheme();

  const HandleLogout = () => {
    logOut()
      .then(() => {
        success("Logged out successfully");
      })
      .catch((error) => {
        err(error.promise.message || "Logout failed");
      });
  };

  const Links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `transition-all duration-300 px-3 py-1.5 rounded-md text-sm font-medium ${
              isActive
                ? "bg-primary/10 text-primary"
                : "hover:bg-base-200 text-base-content/80 hover:text-base-content"
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allLoan"
          className={({ isActive }) =>
            `transition-all duration-300 px-3 py-1.5 rounded-md text-sm font-medium ${
              isActive
                ? "bg-primary/10 text-primary"
                : "hover:bg-base-200 text-base-content/80 hover:text-base-content"
            }`
          }
        >
          All Loans
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `transition-all duration-300 px-3 py-1.5 rounded-md text-sm font-medium ${
              isActive
                ? "bg-primary/10 text-primary"
                : "hover:bg-base-200 text-base-content/80 hover:text-base-content"
            }`
          }
        >
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `transition-all duration-300 px-3 py-1.5 rounded-md text-sm font-medium ${
              isActive
                ? "bg-primary/10 text-primary"
                : "hover:bg-base-200 text-base-content/80 hover:text-base-content"
            }`
          }
        >
          Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full glass-light dark:glass border-b border-base-content/5 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Logo />
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-1">
            <ul className="flex items-center gap-1">{Links}</ul>
          </nav>

          {/* Action Icons & Profile */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-base-200 transition-colors text-base-content/70 hover:text-primary"
              aria-label="Toggle theme"
            >
              {theme === "loanlink-dark" ? (
                <IoSunnyOutline className="w-5 h-5" />
              ) : (
                <IoMoonOutline className="w-5 h-5" />
              )}
            </button>

            {/* Dashboard Link */}
            <Link
              to="/dashboard"
              className="hidden sm:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary hover:bg-primary-focus transition-all transform hover:scale-105"
            >
              Dashboard
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="flex items-center gap-2 p-1 rounded-full border border-base-content/10 hover:border-primary/50 transition-all hover:bg-primary/5"
                >
                  <IoReorderThree className="w-6 h-6 text-base-content/70" />
                  <img
                    src={user?.photoURL || avatar}
                    alt="user"
                    className="w-8 h-8 object-cover rounded-full shadow-sm ring-2 ring-transparent group-hover:ring-primary/20"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content mt-3 z-[1] p-2 shadow-2xl menu menu-sm bg-base-100 rounded-xl w-56 border border-base-content/5 animate-in fade-in slide-in-from-top-1"
                >
                  <div className="px-4 py-2 border-b border-base-content/5 mb-1">
                    <p className="text-xs text-base-content/50 uppercase tracking-wider font-semibold">
                      Account
                    </p>
                    <p className="text-sm font-medium truncate">
                      {user.displayName || "User"}
                    </p>
                  </div>
                  <li>
                    <Link to="/dashboard/profile" className="py-2 hover:text-primary">
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/my-Loan" className="py-2 hover:text-primary">
                      My Loans
                    </Link>
                  </li>
                  <div className="divider my-1 opacity-50"></div>
                  <li onClick={HandleLogout}>
                    <p className="text-error py-2 hover:bg-error/10 font-medium">
                      Logout
                    </p>
                  </li>
                </ul>
              </div>
            ) : (
              <Link
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-base-content hover:text-primary transition-colors"
                to="/login"
              >
                <FaArrowRightFromBracket className="w-4 h-4" /> 
                <span>Log In</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
