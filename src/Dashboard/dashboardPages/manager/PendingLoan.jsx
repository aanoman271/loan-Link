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
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
        <div>
          <h2 className="text-3xl font-bold text-base-content">Pending Applications</h2>
          <p className="text-base-content/50 mt-1">Review and process borrower applications awaiting decision.</p>
        </div>
        
        <div className="relative group">
          <input
            type="text"
            placeholder="Search borrower or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-80 pl-10 pr-4 py-3 bg-base-100 border border-base-content/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all border-transparent focus:border-primary/30 shadow-sm"
          />
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/30 group-focus-within:text-primary transition-colors">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
        </div>
      </div>

      <div className="card-modern overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200/50">
              <tr>
                <th className="py-5 px-6 text-base-content/60 font-semibold uppercase text-[11px] tracking-wider">Borrower Info</th>
                <th className="py-5 px-6 text-base-content/60 font-semibold uppercase text-[11px] tracking-wider text-center">Amount</th>
                <th className="py-5 px-6 text-base-content/60 font-semibold uppercase text-[11px] tracking-wider text-center">Date Applied</th>
                <th className="py-5 px-6 text-base-content/60 font-semibold uppercase text-[11px] tracking-wider text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.length > 0 ? (
                filteredApplications.map((app) => (
                  <tr key={app?._id} className="hover:bg-base-200/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-600 font-bold">
                          {app?.firstName?.charAt(0) || 'B'}
                        </div>
                        <div>
                          <p className="font-bold text-base-content">{app?.firstName} {app?.lastName}</p>
                          <p className="text-[10px] text-base-content/40 font-bold uppercase tracking-tighter">ID: {app?._id?.slice(-8)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="font-bold text-base-content">৳ {app.loanAmount.toLocaleString()}</span>
                    </td>
                    <td className="py-4 px-6 text-center text-sm text-base-content/50">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => navigate(`/dashboard/loan-application/${app._id}`)}
                          className="btn btn-ghost btn-sm text-info hover:bg-info/10 rounded-xl"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => handleApprove(app._id)}
                          className="btn btn-ghost btn-sm text-success hover:bg-success/10 rounded-xl"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(app._id)}
                          className="btn btn-ghost btn-sm text-error hover:bg-error/10 rounded-xl"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-20">
                    <div className="flex flex-col items-center gap-2 opacity-30">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                       <p className="text-xl font-bold">No pending applications</p>
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

export default PendingLoan;
