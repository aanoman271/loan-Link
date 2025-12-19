import React from "react";
import { useEffect } from "react";
import useAxiosSecure from "../../Hooks/useSecureInstance";
import useSwal from "../../Hooks/useSwal";
import { useState } from "react";

const ManageUser = () => {
  const secureInstance = useAxiosSecure();
  const { err, success } = useSwal();
  const [allUser, setAllUser] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState({});
  useEffect(() => {
    const fetching = async () => {
      try {
        const response = await secureInstance.get("/allUser");
        setAllUser(response.data);
      } catch (error) {
        err(error.response.data.message);
      }
    };
    fetching();
  }, [secureInstance]);

  const handleRoleChange = async (userId, value) => {
    setSelectedRoles((prev) => ({
      ...prev,
      [userId]: value,
    }));
    try {
      await secureInstance.patch(`/RoleUpdate/${userId}`, { role: value });
      success("Role Chaged to ", value);
    } catch (error) {
      err(error.response.data.message);
    }
  };
  console.log(allUser);
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">Manage user</h2>
        {/* <input
          type="text"
          placeholder="Search by title or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-80 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
        /> */}
      </div>
      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table w-full">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allUser.length > 0 ? (
              allUser.map((user) => (
                <tr
                  key={user._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3">
                    <span className="px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-600">
                      {user?.name}
                    </span>
                  </td>
                  <td className="p-3 font-medium text-gray-800">
                    {user?.email}
                  </td>
                  <td className="p-3 text-gray-600">{user?.role}</td>

                  <td className="p-3 text-center space-x-2">
                    <td className="p-3 text-center space-x-2">
                      <select
                        value={
                          selectedRoles[user._id] || user.role || "borrower"
                        }
                        onChange={(e) =>
                          handleRoleChange(user._id, e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="" disabled>
                          -- Choose a role --
                        </option>
                        <option value="borrower">Borrower</option>
                        <option value="manager">Manager</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-500">
                  No loans found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
