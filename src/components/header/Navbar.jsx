import React from "react";
import Logo from "../Logo";
import { Link, NavLink } from "react-router";
import useAuth from "../../Hooks/useAuth";
import avatar from "../../assets/Tech Life - Add User.png";
import { IoReorderThree } from "react-icons/io5";
import useSwal from "../../Hooks/useSwal";
import { FaArrowRightFromBracket } from "react-icons/fa6";
// import { useEffect } from "react";
// import { useState } from "react";
// import useAxiosSecure from "../../Hooks/useSecureInstance";

const Navbar = () => {
  // const instanceSercure = useAxiosSecure();
  const { user, logOut } = useAuth();
  const { success, err } = useSwal();
  // const [dbUser, setDbUser] = useState(null);
  // useEffect(() => {
  //   const fetch = async () => {
  //     try {
  //       const res = await instanceSercure.get("/user");
  //       setDbUser(res.data);
  //     } catch (error) {
  //       err(error?.response?.data?.message || error.message);
  //     }
  //   };
  //   fetch();
  // }, [user]);
  const HandleLogout = () => {
    logOut()
      .then(() => {
        success("Logged out successfully");
      })
      .catch((error) => {
        err(error.promise.message || "Logout failed");
      });
  };
  // const navigate = useNavigate();
  // const handleNavigate = () => {
  //   if (dbUser?.role === "Manager") {
  //     return navigate("/dashboard");
  //   }
  //   if (dbUser?.role === "Borrower") {
  //     return navigate("/browerDashboard");
  //   }
  //   if (dbUser?.role === "Admin") {
  //     return navigate("/adminDashboard");
  //   }
  // };

  const Links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "underline text-gray-600 font-medium"
              : "text-gray-800 font-medium"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allLoan"
          className={({ isActive }) =>
            isActive
              ? "underline text-gray-600 font-medium"
              : "text-gray-800 font-medium"
          }
        >
          All-loan{" "}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "underline text-gray-600 font-medium"
              : "text-gray-800 font-medium"
          }
        >
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "underline text-gray-600 font-medium"
              : "text-gray-800 font-medium"
          }
        >
          Contract
        </NavLink>
      </li>
    </>
  );
  return (
    <header className="bg-[#f4f4f4] w-full flex justify-between items-center px-4 py-3.5 ">
      <div className="">
        <Logo></Logo>
      </div>
      <div className="">
        <ul className="flex  gap-6 navlink">{Links}</ul>
      </div>

      <div className="flex items-center gap-3">
        <div className=" flex items-center gap-3">
          <Link
            to="/dashboard"
            className="btn py-0  bg-blue-600 text-white  font-medium"
          >
            {/* "/dashboard" */}
            Dashboard
          </Link>
        </div>

        {/* className="cursor-pointer hover:border-5 transition-[1s] border-gray-300  w-10 h-10 rounded-full" */}

        {user ? (
          <div className="dropdown">
            <div tabIndex={0} role="button" className=" m-1">
              {" "}
              <div
                className="overflow-hidden cursor-pointer gap-2 p-1 hover:border-gray-400 transition-[1s]  flex justify-center items-center
  border border-gray-300   rounded-full"
              >
                <IoReorderThree className="w-7 h-7" />

                <img
                  src={user?.photoURL || avatar}
                  alt="user"
                  className=" w-8 h-8 object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              <li>
                <Link>profile</Link>
              </li>
              <li onClick={HandleLogout}>
                <p>Logout</p>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            className="text-gray-800 flex gap-2 items-center font-medium"
            to="login"
          >
            <FaArrowRightFromBracket className="font-bold" /> Log In
          </Link>
        )}

        <label className=" flex cursor-pointer gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <input
            type="checkbox"
            value="synthwave"
            className="toggle theme-controller"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </label>
      </div>
    </header>
  );
};

export default Navbar;
