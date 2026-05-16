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
            `transition-all duration-300 px-3 py-1.5 rounded-md text-sm font-medium ${isActive
              ? "bg-primary/10 text-primary"
              : "hover:bg-app-surface-hover text-app-text-secondary hover:text-app-text"
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
            `transition-all duration-300 px-3 py-1.5 rounded-md text-sm font-medium ${isActive
              ? "bg-primary/10 text-primary"
              : "hover:bg-app-surface-hover text-app-text-secondary hover:text-app-text"
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
            `transition-all duration-300 px-3 py-1.5 rounded-md text-sm font-medium ${isActive
              ? "bg-primary/10 text-primary"
              : "hover:bg-app-surface-hover text-app-text-secondary hover:text-app-text"
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
            `transition-all duration-300 px-3 py-1.5 rounded-md text-sm font-medium ${isActive
              ? "bg-primary/10 text-primary"
              : "hover:bg-app-surface-hover text-app-text-secondary hover:text-app-text"
            }`
          }
        >
          Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full glass-light dark:glass border-b border-app-border-subtle shadow-sm">
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

          {/* Action Icons & Profile (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-app-surface-hover transition-colors text-app-text-secondary hover:text-primary"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
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
                  className="flex items-center gap-2 p-1 rounded-full border border-app-border-subtle hover:border-primary/50 transition-all hover:bg-primary/5"
                >
                  <IoReorderThree className="w-6 h-6 text-app-text-secondary" />
                  <img
                    src={user?.photoURL || avatar}
                    alt="user"
                    className="w-8 h-8 object-cover rounded-full shadow-sm ring-2 ring-transparent group-hover:ring-primary/20"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content mt-3 z-[1] p-2 shadow-2xl menu menu-sm bg-app-surface-elevated rounded-xl w-56 border border-app-border-subtle animate-in fade-in slide-in-from-top-1"
                >
                  <div className="px-4 py-2 border-b border-app-border-subtle mb-1">
                    <p className="text-xs text-app-text-muted uppercase tracking-wider font-semibold">
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
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-app-text hover:text-primary transition-colors"
                to="/login"
              >
                <FaArrowRightFromBracket className="w-4 h-4" />
                <span>Log In</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Dropdown */}
          <div className="dropdown dropdown-end md:hidden">
            <div
              tabIndex={0}
              role="button"
              className="p-2 rounded-md border border-app-border-subtle hover:border-primary/50 text-app-text-secondary transition-all hover:bg-primary/5 flex items-center justify-center"
            >
              <IoReorderThree className="w-6 h-6" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content mt-3 z-[1] p-2 shadow-2xl menu menu-sm bg-app-surface-elevated rounded-xl w-64 border border-app-border-subtle animate-in fade-in slide-in-from-top-1"
            >
              {/* Profile Info */}
              {user && (
                <div className="px-4 py-3 border-b border-app-border-subtle mb-2 flex items-center gap-3">
                  <img
                    src={user?.photoURL || avatar}
                    alt="user"
                    className="w-10 h-10 object-cover rounded-full shadow-sm ring-2 ring-transparent"
                    referrerPolicy="no-referrer"
                  />
                  <div className="overflow-hidden">
                    <p className="text-sm font-medium text-app-text truncate">
                      {user.displayName || "User"}
                    </p>
                  </div>
                </div>
              )}

              {/* Main Nav Links */}
              {Links}

              {/* Dashboard Link */}
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `transition-all duration-300 px-3 py-1.5 rounded-md text-sm font-medium ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-app-surface-hover text-app-text-secondary hover:text-app-text"
                    }`
                  }
                >
                  Dashboard
                </NavLink>
              </li>

              {/* User Specific Links */}
              {user && (
                <>
                  <div className="divider my-1 opacity-50"></div>
                  <li>
                    <NavLink
                      to="/dashboard/profile"
                      className={({ isActive }) =>
                        `transition-all duration-300 px-3 py-1.5 rounded-md text-sm font-medium ${
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-app-surface-hover text-app-text-secondary hover:text-app-text"
                        }`
                      }
                    >
                      My Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/my-Loan"
                      className={({ isActive }) =>
                        `transition-all duration-300 px-3 py-1.5 rounded-md text-sm font-medium ${
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-app-surface-hover text-app-text-secondary hover:text-app-text"
                        }`
                      }
                    >
                      My Loans
                    </NavLink>
                  </li>
                </>
              )}

              {/* Theme Toggle */}
              <div className="divider my-1 opacity-50"></div>
              <div className="px-3 py-2 flex items-center justify-between text-sm font-medium text-app-text-secondary hover:text-app-text transition-colors">
                <span className="cursor-default">Theme</span>
                <button
                  onClick={toggleTheme}
                  className="p-1.5 rounded-full hover:bg-app-surface-hover transition-colors text-app-text-secondary hover:text-primary border border-app-border-subtle flex items-center justify-center gap-2"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <IoSunnyOutline className="w-4 h-4" />
                  ) : (
                    <IoMoonOutline className="w-4 h-4" />
                  )}
                  <span className="text-xs">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                </button>
              </div>

              {/* Login / Logout */}
              <div className="divider my-1 opacity-50"></div>
              {user ? (
                <li onClick={HandleLogout}>
                  <p className="text-error py-2 px-3 hover:bg-error/10 font-medium transition-colors rounded-md w-full flex">
                    Logout
                  </p>
                </li>
              ) : (
                <div className="px-2 pb-1">
                  <Link
                    className="flex items-center justify-center gap-2 w-full py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-focus transition-colors shadow-sm"
                    to="/login"
                  >
                    <FaArrowRightFromBracket className="w-4 h-4" />
                    <span>Log In</span>
                  </Link>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

