import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useSecureInstance";
import useSwal from "../../Hooks/useSwal";
import Lodding from "../../components/Lodding";
import { FaEye, FaCheck, FaTimes, FaUser, FaMoneyBillWave, FaSearch, FaCalendarAlt, FaTasks } from "react-icons/fa";

const LoanApplications = () => {
  const axiosSecure = useAxiosSecure();
  const { success, err, confirm } = useSwal();
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        // Assuming /all-loan-applications based on project patterns like /allUser and /allLoan
        // If this endpoint is different, it can be adjusted here.
        const res = await axiosSecure.get("/allApplication");
        setApplications(res.data);
      } catch (error) {
        console.error("Fetch error:", error);
        // If /all-loan-applications doesn't exist, try a fallback if known, 
        // or show a descriptive error.
        err(error.response?.data?.message || "Failed to load applications. Endpoint /loan-applications not found. Please verify the correct admin endpoint.");
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, [axiosSecure]);

  const handleApprove = async (id) => {
    try {
      const result = await confirm("Approve this loan application?");
      if (result.isConfirmed) {
        await axiosSecure.patch(`/loan-applications/${id}/approve`);
        setApplications((prev) =>
          prev.map((app) =>
            app._id === id ? { ...app, status: "approved" } : app
          )
        );
        success("Loan application approved successfully");
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
        setApplications((prev) =>
          prev.map((app) =>
            app._id === id ? { ...app, status: "rejected" } : app
          )
        );
        success("Loan application rejected successfully");
      }
    } catch (error) {
      err(error.response?.data?.message || "Rejection failed");
    }
  };

  const filteredApplications = applications.filter(
    (app) =>
      app?.firstName?.toLowerCase()?.includes(search.toLowerCase()) ||
      app?.lastName?.toLowerCase()?.includes(search.toLowerCase()) ||
      app?.userEmail?.toLowerCase()?.includes(search.toLowerCase()) ||
      app?.loanTitle?.toLowerCase()?.includes(search.toLowerCase())
  );

  if (loading) return <Lodding />;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
        <div>
          <h2 className="text-3xl font-bold text-app-text">Loan Applications</h2>
          <p className="text-app-text-muted mt-1">
            Manage and review all incoming loan requests across the platform.
          </p>
        </div>

        <div className="relative group">
          <input
            type="text"
            placeholder="Search by name, email or loan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-80 pl-10 pr-4 py-3 bg-app-surface border border-app-border-subtle rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all border-transparent focus:border-primary/30 shadow-sm text-app-text"
          />
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-app-text-muted group-focus-within:text-primary transition-colors">
            <FaSearch className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="card-modern overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full border-collapse">
            <thead className="bg-app-surface-hover/50">
              <tr>
                <th className="py-5 px-6 text-app-text-secondary font-semibold uppercase text-[11px] tracking-wider text-left">
                  Applicant
                </th>
                <th className="py-5 px-6 text-app-text-secondary font-semibold uppercase text-[11px] tracking-wider text-left">
                  Loan Details
                </th>
                <th className="py-5 px-6 text-app-text-secondary font-semibold uppercase text-[11px] tracking-wider text-center">
                  Status
                </th>
                {/* <th className="py-5 px-6 text-app-text-secondary font-semibold uppercase text-[11px] tracking-wider text-center">
                  Applied Date
                </th> */}
                <th className="py-5 px-6 text-app-text-secondary font-semibold uppercase text-[11px] tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.length > 0 ? (
                filteredApplications.map((app) => (
                  <tr key={app?._id} className="hover:bg-app-surface-hover/30 transition-colors border-b border-app-border-subtle/50">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">
                          {app?.firstName?.charAt(0) || <FaUser className="w-4 h-4" />}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-app-text truncate">
                            {app?.firstName} {app?.lastName}
                          </p>
                          <p className="text-xs text-app-text-muted truncate">
                            {app?.userEmail}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-app-text flex items-center gap-2">
                          {/* <FaMoneyBillWave className="text-success text-xs" /> */}
                          $ {app?.loanAmount?.toLocaleString()}
                        </span>
                        <span className="text-xs text-app-text-muted truncate max-w-[150px]">
                          {app?.loanTitle}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span
                        className={`badge badge-sm rounded-lg font-bold uppercase tracking-wider h-7 px-3 border-none ${app?.status === "approved"
                          ? "bg-success/10 text-success"
                          : app?.status === "pending"
                            ? "bg-orange-500/10 text-orange-600"
                            : app?.status === "rejected"
                              ? "bg-error/10 text-error"
                              : "bg-warning/10 text-warning-content"
                          }`}
                      >
                        {app?.status || "Pending"}
                      </span>
                    </td>
                    {/* <td className="py-4 px-6 text-center text-sm text-app-text-muted">
                      <div className="flex items-center justify-center gap-2">
                        <FaCalendarAlt className="text-[10px]" />
                        {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : "N/A"}
                      </div>
                    </td> */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => navigate(`/dashboard/loan-application/${app._id}`)}
                          className="btn btn-ghost btn-sm text-info hover:bg-info/10 rounded-xl px-3"
                          title="View Details"
                        >
                          <FaEye className="h-4 w-4" />
                        </button>

                        {app?.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleApprove(app._id)}
                              className="btn btn-ghost btn-sm text-success hover:bg-success/10 rounded-xl px-3"
                              title="Approve"
                            >
                              <FaCheck className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleReject(app._id)}
                              className="btn btn-ghost btn-sm text-error hover:bg-error/10 rounded-xl px-3"
                              title="Reject"
                            >
                              <FaTimes className="h-4 w-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-20 text-app-text-muted">
                    <div className="flex flex-col items-center gap-3 opacity-30">
                      <FaTasks className="h-12 w-12" />
                      <p className="text-xl font-bold">No applications found</p>
                      {/* {search && <p className="text-sm">Try adjusting your search query</p>} */}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LoanApplications;
