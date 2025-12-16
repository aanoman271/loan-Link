import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useSecureInstance";
import useSwal from "../../../Hooks/useSwal";
import useAuth from "../../../Hooks/useAuth";

const PendingLoan = () => {
  const axiosSecure = useAxiosSecure();
  const { success, err, confirm } = useSwal();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPending = async () => {
      try {
        const res = await axiosSecure.get(`/pendingLoan?email=${user?.email}`);
        setApplications(res.data);
      } catch (error) {
        err(error.message || "Failed to load pending loans");
      }
    };
    fetchPending();
  }, [user]);
  const handleApprove = async (id) => {
    try {
      const result = await confirm("Approve this loan application?");
      if (result.isConfirmed) {
        await axiosSecure.patch(`/loan-applications/${id}/approve`);
        setApplications((prev) => prev.filter((a) => a._id !== id));
        success("Loan approved successfully");
      }
    } catch (error) {
      err(error.response?.data?.message || "Approval failed");
    }
  };

  const handleReject = async (id) => {
    try {
      const result = await confirm("Reject this loan application?");
      if (result.isConfirmed) {
        await axiosSecure.patch(`/loan-applications/${id}/reject`);
        setApplications((prev) => prev.filter((a) => a._id !== id));
        success("Loan rejected successfully");
      }
    } catch (error) {
      err(error.response?.data?.message || "Rejection failed");
    }
  };

  const filteredApplications = applications.filter(
    (app) =>
      app?.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      app?.userEmail?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Pending Loan Applications
        </h2>
        <input
          type="text"
          placeholder="Search by borrower name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-80 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table w-full">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Loan ID</th>
              <th className="p-3 text-left">Borrower</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.length > 0 ? (
              filteredApplications.map((app) => (
                <tr
                  key={app?._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3 text-sm">{app?._id}</td>
                  <td className="p-3">
                    <p className="font-medium text-gray-800">
                      {app.firstName + " " + app.lastName}
                    </p>
                    <p className="text-sm text-gray-500">{app?.userEmail}</p>
                  </td>
                  <td className="p-3 font-semibold">৳ {app.loanAmount}</td>
                  <td className="p-3 text-sm text-gray-600">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-center space-x-2">
                    <button
                      onClick={() =>
                        navigate(`/dashboard/loan-application/${app._id}`)
                      }
                      className="px-3 py-1 text-sm rounded-md bg-blue-500 text-white hover:bg-blue-600"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleApprove(app._id)}
                      className="px-3 py-1 text-sm rounded-md bg-green-500 text-white hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(app._id)}
                      className="px-3 py-1 text-sm rounded-md bg-red-500 text-white hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-500">
                  No pending loan applications found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingLoan;
