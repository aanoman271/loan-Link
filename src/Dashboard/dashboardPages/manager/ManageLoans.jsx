import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useSwal from "../../../Hooks/useSwal";
import useAxiosSecure from "../../../Hooks/useSecureInstance";

const ManageLoans = () => {
  const axiosSecure = useAxiosSecure();
  const [loans, setLoans] = useState([]);
  const { success, err, confirm } = useSwal();

  const [search, setSearch] = useState("");

  const handleDelete = async (id, title) => {
    try {
      const result = await confirm(
        `Are you sure you want to delete the loan: ${title}?`
      );
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/loan/${id}`);

        if (res.data.deletedCount > 0) {
          setLoans(loans.filter((loan) => loan._id !== id));
          success(`Loan "${title}" deleted successfully!`);
        }
      }
    } catch (error) {
      err(error.response?.data?.message || "Failed to delete loan.");
    }
  };
  useEffect(() => {
    const fetch = async () => {
      try {
        const promise = await axiosSecure.get("/ManageLoan");
        setLoans(promise.data);
      } catch (error) {
        err(error.message);
      }
    };
    fetch();
  }, [axiosSecure]);
  const filteredLoans = loans.filter(
    (loan) =>
      loan.title.toLowerCase().includes(search.toLowerCase()) ||
      loan.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
        <div>
          <h2 className="text-3xl font-bold text-base-content">Manage Loans</h2>
          <p className="text-base-content/50 mt-1">You have <span className="text-primary font-bold">{filteredLoans.length}</span> active loan products.</p>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="relative group">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full md:w-64 pl-10 pr-4 py-2.5 bg-base-100 border border-base-content/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all border-transparent focus:border-primary/30 shadow-sm"
              />
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/30 group-focus-within:text-primary transition-colors">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
           </div>
           <Link to="/dashboard/add-Loan" className="btn btn-primary rounded-xl px-6 shadow-lg shadow-primary/20">Add New</Link>
        </div>
      </div>

      {/* Table Section */}
      <div className="card-modern overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200/50">
              <tr>
                <th className="py-5 px-6 text-base-content/60 font-semibold uppercase text-[11px] tracking-wider">Product Info</th>
                <th className="py-5 px-6 text-base-content/60 font-semibold uppercase text-[11px] tracking-wider text-center">Interest</th>
                <th className="py-5 px-6 text-base-content/60 font-semibold uppercase text-[11px] tracking-wider text-center">Category</th>
                <th className="py-5 px-6 text-base-content/60 font-semibold uppercase text-[11px] tracking-wider text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLoans.length > 0 ? (
                filteredLoans.map((loan) => (
                  <tr key={loan._id} className="hover:bg-base-200/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={loan?.photoUrl}
                          alt={loan?.title}
                          className="w-12 h-12 object-cover rounded-xl shadow-sm border border-base-content/5"
                        />
                        <span className="font-bold text-base-content">{loan?.title}</span>
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
                      <div className="flex justify-center gap-2">
                        <Link
                          to={`/dashboard/update-loan/${loan?._id}`}
                          className="btn btn-ghost btn-sm text-info hover:bg-info/10 rounded-xl px-4"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(loan?._id, loan?.title)}
                          className="btn btn-ghost btn-sm text-error hover:bg-error/10 rounded-xl px-4"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-20 text-base-content/30">
                    <div className="flex flex-col items-center gap-2">
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

export default ManageLoans;
