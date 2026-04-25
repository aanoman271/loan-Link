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
  const [search, setSearch] = useState("");
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
  const filteredUser = allUser.filter(
    (loan) =>
      loan.name.toLowerCase().includes(search.toLowerCase()) ||
      loan.email.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
        <div>
          <h2 className="text-3xl font-bold text-base-content">Manage Users</h2>
          <p className="text-base-content/50 mt-1">Control user access and assign roles within the system.</p>
        </div>
        
        <div className="relative group">
          <input
            type="text"
            placeholder="Search by Name or Email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-80 pl-10 pr-4 py-3 bg-base-100 border border-base-content/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all border-transparent focus:border-primary/30 shadow-sm"
          />
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/30 group-focus-within:text-primary transition-colors">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="card-modern overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200/50">
              <tr>
                <th className="py-5 px-6 text-base-content/60 font-semibold uppercase text-[11px] tracking-wider">User Info</th>
                <th className="py-5 px-6 text-base-content/60 font-semibold uppercase text-[11px] tracking-wider">Current Role</th>
                <th className="py-5 px-6 text-base-content/60 font-semibold uppercase text-[11px] tracking-wider">Assign Role</th>
                <th className="py-5 px-6 text-base-content/60 font-semibold uppercase text-[11px] tracking-wider text-center">Status & Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUser.length > 0 ? (
                filteredUser.map((user) => (
                  <tr key={user._id} className="hover:bg-base-200/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                          {user?.name?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <p className="font-bold text-base-content">{user?.name}</p>
                          <p className="text-xs text-base-content/50">{user?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`badge badge-sm font-bold px-3 py-3 border-none ${
                        user?.role === 'Admin' ? 'bg-purple-500/10 text-purple-600' : 
                        user?.role === 'Manager' ? 'bg-blue-500/10 text-blue-600' : 
                        'bg-gray-500/10 text-gray-600'
                      }`}>
                        {user?.role || 'Borrower'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <select
                        value={selectedRoles[user._id] || user.role || "Borrower"}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        className="select select-bordered select-sm rounded-xl bg-base-200 border-none focus:ring-2 focus:ring-primary/20 w-36"
                      >
                        <option value="Borrower">Borrower</option>
                        <option value="Manager">Manager</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </td>
                    <td className="py-4 px-6 text-center">
                      {user?.Suspend ? (
                        <div className="flex items-center justify-center gap-2 text-error font-bold text-sm">
                          <span className="w-2 h-2 rounded-full bg-error animate-pulse" />
                          Suspended
                        </div>
                      ) : (
                        <button
                          className="btn btn-ghost btn-sm text-error hover:bg-error/10 rounded-xl px-4"
                          onClick={() => openModal(user)}
                        >
                          Suspend User
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-20">
                    <div className="flex flex-col items-center gap-2 opacity-30">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                       <p className="text-xl font-bold">No users found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Suspend Modal */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle backdrop-blur-sm">
        <div className="modal-box rounded-3xl border border-base-content/10 shadow-2xl p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-error/10 flex items-center justify-center text-error">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <div>
              <h3 className="font-bold text-xl">Suspend {suspendedUser?.name}</h3>
              <p className="text-sm text-base-content/50">This user will lose access to all dashboard features.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-error">Reason for Suspension</span>
              </label>
              <textarea
                name="reason"
                placeholder="Explain why this user is being suspended..."
                className="textarea textarea-bordered h-24 rounded-2xl focus:ring-2 focus:ring-error/20 border-base-content/10"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-success">Internal Feedback</span>
              </label>
              <textarea
                name="feedback"
                placeholder="Additional notes for admin team..."
                className="textarea textarea-bordered h-24 rounded-2xl focus:ring-2 focus:ring-success/20 border-base-content/10"
              />
            </div>

            <div className="modal-action gap-3">
              <button type="button" className="btn btn-ghost rounded-xl flex-1" onClick={() => document.getElementById("my_modal_5").close()}>Cancel</button>
              <button type="submit" className="btn btn-error rounded-xl flex-1 shadow-lg shadow-error/20">Confirm Suspension</button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ManageUser;
