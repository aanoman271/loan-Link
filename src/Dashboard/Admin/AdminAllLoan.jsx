import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import useInstance from "../../Hooks/useInstance";
import useSwal from "../../Hooks/useSwal";
import Lodding from "../../components/Lodding";
import useAxiosSecure from "../../Hooks/useSecureInstance";
import { Link } from "react-router";

const AdminAllLoan = () => {
  const [allLoans, setAllLoans] = useState([]);
  const instance = useInstance();
  const [lodding, setLodding] = useState(true);
  const { err, success } = useSwal();

  useEffect(() => {
    const fetch = async () => {
      try {
        setLodding(true);
        const res = await instance.get("/allLoan");
        setAllLoans(res.data);
      } catch (error) {
        err(error.message);
      } finally {
        setLodding(false);
      }
    };
    fetch();
  }, [instance]);
  const secureInstance = useAxiosSecure();
  const handleToggle = async (id, value) => {
    try {
      await secureInstance.patch(`/showHome/${id}`, {
        showOnHome: value,
      });
      success("");

      setAllLoans((prev) =>
        prev.map((loan) =>
          loan._id === id ? { ...loan, showOnHome: value } : loan
        )
      );
    } catch (error) {
      err(error.message);
    }
  };

  if (lodding) return <Lodding></Lodding>;
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
        <div>
          <h2 className="text-3xl font-bold text-base-content">All Loans</h2>
          <p className="text-base-content/50 mt-1">Manage all loan products available in the system.</p>
        </div>
        
        <Link 
          to="/dashboard/add-Loan" 
          className="btn btn-primary rounded-xl px-6 shadow-lg shadow-primary/20"
        >
          Add New Loan
        </Link>
      </div>

      <div className="card-modern overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200/50">
              <tr>
                <th className="py-5 px-6 text-base-content/60 font-semibold uppercase text-[11px] tracking-wider">Loan Details</th>
                <th className="py-5 px-6 text-base-content/60 font-semibold uppercase text-[11px] tracking-wider text-center">Interest</th>
                <th className="py-5 px-6 text-base-content/60 font-semibold uppercase text-[11px] tracking-wider text-center">Category</th>
                <th className="py-5 px-6 text-base-content/60 font-semibold uppercase text-[11px] tracking-wider text-center">Home Display</th>
                <th className="py-5 px-6 text-base-content/60 font-semibold uppercase text-[11px] tracking-wider text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allLoans.length > 0 ? (
                allLoans.map((loan) => (
                  <tr key={loan?._id} className="hover:bg-base-200/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <img
                          className="h-14 w-14 rounded-xl object-cover shadow-md border border-base-content/5"
                          src={loan?.photoUrl}
                          alt={loan?.title}
                        />
                        <div>
                          <p className="font-bold text-base-content">{loan?.title}</p>
                          <p className="text-xs text-base-content/40 truncate max-w-[200px]">{loan?.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="font-bold text-primary">{loan?.interestRate}%</span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="badge badge-outline border-base-content/10 text-base-content/70 px-3 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider">
                        {loan?.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <input
                        type="checkbox"
                        checked={loan?.showOnHome === true}
                        onChange={(e) => handleToggle(loan._id, e.target.checked)}
                        className="toggle toggle-primary toggle-sm"
                      />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Link
                        to={`/dashboard/update-loan/${loan._id}`}
                        className="btn btn-ghost btn-sm text-primary hover:bg-primary/10 rounded-xl px-4"
                      >
                        Edit Details
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-20">
                    <div className="flex flex-col items-center gap-2 opacity-30">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                       <p className="text-xl font-bold">No loans products found</p>
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

export default AdminAllLoan;
