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
  const [suspendedUser, setSuspendedUser] = useState(null);
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
  const openModal = (suspendUser) => {
    document.getElementById("my_modal_5").showModal();
    setSuspendedUser(suspendUser);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const reason = form.reason.value;
    const feedback = form.feedback.value;

    if (!suspendedUser) return;
    try {
      await secureInstance.patch(`/suspend-user/${suspendedUser?._id}`, {
        reason,
        feedback,
        Suspend: true,
      });
      success(suspendedUser?.name, " Suspended Now");
    } catch (error) {
      err(error.response.data.message || error.message);
      console.log(error);
    } finally {
      document.getElementById("my_modal_5").close();
    }
    e.target.reset();
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
                    <div className="flex gap-2">
                      <div>
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
                      </div>

                      {user?.Suspend ? (
                        <p className=" flex items-center font-semibold text-red-500">
                          suspend User
                        </p>
                      ) : (
                        <button
                          className="btn btn-error"
                          onClick={() => openModal(user)}
                        >
                          Suspend
                        </button>
                      )}
                    </div>
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
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form onSubmit={handleSubmit}>
            <label className="text-[17px] font-semibold text-red-500">
              Reason
            </label>
            <textarea
              name="reason"
              className="border border-gray-400 w-[90%]"
            ></textarea>
            <label className="text-[17px] font-semibold text-green-500">
              Feedback
            </label>
            <textarea
              name="feedback"
              className="border border-gray-400 w-[90%]"
            ></textarea>
            <button type="submit" className="btn btn-success">
              submit
            </button>
          </form>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ManageUser;
