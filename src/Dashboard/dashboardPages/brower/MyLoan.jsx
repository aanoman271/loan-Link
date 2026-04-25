import React from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../../Hooks/useSecureInstance";
import { useEffect } from "react";
import { useState } from "react";
import useSwal from "../../../Hooks/useSwal";
import Lodding from "../../../components/Lodding";
import useInstance from "../../../Hooks/useInstance";

const MyLoan = () => {
  const { err, success, confirm } = useSwal();
  const instance = useAxiosSecure();
  const noSecure = useInstance();
  const [loan, setLoans] = useState([]);
  const [lodding, setLodding] = useState(true);
  useEffect(() => {
    const fetch = async () => {
      try {
        setLodding(true);
        const res = await instance.get("/myLoan");
        setLoans(res.data);
      } catch (error) {
        err(error.response?.data?.message || "Rejection failed");
      } finally {
        setLodding(false);
      }
    };
    fetch();
  }, [instance]);
  console.log(loan);

  const handleCancel = async (id) => {
    try {
      const result = await confirm(
        `Are you sure you want to cancel your application?`
      );
      if (result.isConfirmed) {
        const res = await instance.delete(`/deleteMyLoan/${id}`);
        if (res.data.deletedCount > 0) {
          success("Cancel successfull");
          const filtaredApp = loan.filter((l) => l._id !== id);

          setLoans(filtaredApp);
        }
      }
    } catch (error) {
      err(
        error.response?.data?.message ||
          error.message ||
          "something wrong try agian"
      );
    }
  };

  const handlePayment = async (loan) => {
    try {
      const res = await noSecure.post("/create-payment-session", {
        loanId: loan._id,
        email: loan.userEmail,
      });

      window.location.href = res.data.url;
    } catch (error) {
      console.error(error);
      alert("Payment failed");
    }
  };

  if (lodding) return <Lodding></Lodding>;
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
        <div>
          <h2 className="text-3xl font-bold text-base-content">My Applications</h2>
          <p className="text-base-content/50 mt-1">Track and manage your submitted loan requests.</p>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="px-4 py-2 bg-base-200 rounded-xl flex items-center gap-3">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              <span className="text-sm font-bold text-base-content/70">{loan.length} Applications</span>
           </div>
           <Link to="/allLoan" className="btn btn-primary rounded-xl px-6 shadow-lg shadow-primary/20">Apply New</Link>
        </div>
      </div>

      {/* Table Section */}
      <div className="card-modern overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200/50">
              <tr>
                <th className="py-5 px-6 text-base-content/60 font-semibold uppercase text-[11px] tracking-wider">Loan Title</th>
                <th className="py-5 px-6 text-base-content/60 font-semibold uppercase text-[11px] tracking-wider text-center">Amount</th>
                <th className="py-5 px-6 text-base-content/60 font-semibold uppercase text-[11px] tracking-wider text-center">Status</th>
                <th className="py-5 px-6 text-base-content/60 font-semibold uppercase text-[11px] tracking-wider text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loan.length > 0 ? (
                loan.map((item) => (
                  <tr key={item._id} className="hover:bg-base-200/30 transition-colors">
                    <td className="py-4 px-6">
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          </div>
                          <div>
                             <p className="font-bold text-base-content">{item?.loanTitle}</p>
                             <p className="text-[10px] text-base-content/40 font-bold uppercase tracking-tighter">REF: {item?._id?.slice(-8)}</p>
                          </div>
                       </div>
                    </td>
                    <td className="py-4 px-6 text-center font-bold text-base-content">
                       ৳ {item?.loanAmount.toLocaleString()}
                    </td>
                    <td className="py-4 px-6 text-center">
                       <span className={`badge badge-sm rounded-lg font-bold uppercase tracking-wider h-7 px-3 border-none ${
                          item?.status === 'approved' ? 'bg-success/10 text-success' : 
                          item?.status === 'pending' ? 'bg-orange-500/10 text-orange-600' : 
                          item?.status === 'unPaid' ? 'bg-warning/10 text-warning-content' :
                          'bg-error/10 text-error'
                       }`}>
                          {item?.status}
                       </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex justify-center gap-2">
                        <Link
                          to={`/dashboard/applicationDeatails/${item?._id}`}
                          className="btn btn-ghost btn-sm text-info hover:bg-info/10 rounded-xl px-4"
                        >
                          View
                        </Link>
                        
                        {item?.status === "pending" && (
                          <button
                            onClick={() => handleCancel(item?._id)}
                            className="btn btn-ghost btn-sm text-error hover:bg-error/10 rounded-xl px-4"
                          >
                            Cancel
                          </button>
                        )}

                        {item?.status === "unPaid" ? (
                          <button
                            onClick={() => handlePayment(item)}
                            className="btn btn-primary btn-sm rounded-xl px-6 shadow-md"
                          >
                            Pay Fee
                          </button>
                        ) : item?.status === "paid" ? (
                           <span className="btn btn-disabled btn-sm rounded-xl px-6 bg-success/20 text-success opacity-100 border-none">Paid</span>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-20">
                    <div className="flex flex-col items-center gap-2 opacity-30">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                       <p className="text-xl font-bold">No applications found</p>
                       <Link to="/allLoan" className="btn btn-link btn-primary no-underline font-bold mt-2">Apply for your first loan</Link>
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

export default MyLoan;
