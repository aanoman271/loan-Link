import { useNavigate } from "react-router-dom";
import useSwal from "../../../Hooks/useSwal";
import useAuth from "../../../Hooks/useAuth";
import { useEffect } from "react";
import useAxiosSecure from "../../../Hooks/useSecureInstance";
import { useState } from "react";

const ManagerProfile = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const instanceSercure = useAxiosSecure();
  const { success, err, confirm } = useSwal();
  const [dbUser, setDbUser] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await instanceSercure.get("/user");
        setDbUser(res.data);
      } catch (error) {
        err(error?.response?.data?.message || error.message);
      }
    };
    fetch();
  }, []);
  console.log(dbUser);
  const handleLogout = async () => {
    try {
      const result = await confirm("Are you sure you want to logout?");
      if (result.isConfirmed) {
        await logOut();
        success("Logged out successfully");
        navigate("/login");
      }
    } catch {
      err("Failed to logout");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">My Profile</h2>

      <div className="bg-white rounded-xl shadow p-6 max-w-3xl">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={user?.photoURL || "https://i.ibb.co/2kRzZ6q/user.png"}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border"
          />

          <div className="flex-1">
            <p className="text-lg font-semibold text-gray-800">
              {user?.displayName || "Manager"}
            </p>
            <p className="text-gray-600">{user?.email}</p>
            <span className="inline-block mt-2 px-3 py-1 text-sm rounded-full bg-purple-100 text-purple-600">
              {dbUser?.role}
            </span>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-gray-50">
            <p className="text-sm text-gray-500">Role</p>
            <p className="font-medium">{dbUser?.role}</p>
          </div>

          <div className="p-4 rounded-lg bg-gray-50">
            <p className="text-sm text-gray-500">Account Status</p>
            <p className="font-medium text-green-600">Active</p>
          </div>

          <div className="p-4 rounded-lg bg-gray-50">
            <p className="text-sm text-gray-500">Email Verified</p>
            <p className="font-medium">{user?.emailVerified ? "Yes" : "No"}</p>
          </div>

          <div className="p-4 rounded-lg bg-gray-50">
            <p className="text-sm text-gray-500">Provider</p>
            <p className="font-medium">{user?.providerData?.[0]?.providerId}</p>
          </div>
        </div>

        <div className="mt-8 text-right">
          <button
            onClick={handleLogout}
            className="px-6 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManagerProfile;
