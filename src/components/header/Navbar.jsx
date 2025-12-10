import React from "react";
import Logo from "../Logo";
import { NavLink } from "react-router";
import img from "../../assets/react.svg";
const Navbar = () => {
  const Links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "underline text-gray-600" : "text-gray-800 font-medium"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allLoan"
          className={({ isActive }) =>
            isActive ? "underline text-gray-600" : "text-gray-800 font-medium"
          }
        >
          All-loan{" "}
        </NavLink>
      </li>
      <li>
        <NavLink to="/" className="text-gray-800  font-medium">
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink to="/" className="text-gray-800  font-medium">
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
      <div></div>
      <div className="flex items-center gap-3">
        <img
          src={img}
          className="cursor-pointer hover:border-5 transition-[1s] border-gray-300  w-10 h-10 rounded-full"
          alt=""
        />
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
