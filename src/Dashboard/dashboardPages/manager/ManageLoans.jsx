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
  }, []);
  const filteredLoans = loans.filter(
    (loan) =>
      loan.title.toLowerCase().includes(search.toLowerCase()) ||
      loan.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">Manage Loans</h2>
        <input
          type="text"
          placeholder="Search by title or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-80 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table w-full">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Interest</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLoans.length > 0 ? (
              filteredLoans.map((loan) => (
                <tr
                  key={loan._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3">
                    <img
                      src={loan?.photoUrl}
                      alt={loan?.title}
                      className="w-14 h-14 object-cover rounded-lg"
                    />
                  </td>
                  <td className="p-3 font-medium text-gray-800">
                    {loan?.title}
                  </td>
                  <td className="p-3 text-gray-600">{loan?.interestRate}%</td>
                  <td className="p-3">
                    <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-600">
                      {loan?.category}
                    </span>
                  </td>
                  <td className="p-3 text-center space-x-2">
                    <Link
                      to={`/dashboard/update-loan/${loan?._id}`}
                      className="inline-block px-3 py-1 text-sm rounded-md bg-green-500 text-white hover:bg-green-600"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(loan?._id, loan?.title)}
                      className="px-3 py-1 text-sm rounded-md bg-red-500 text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
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

export default ManageLoans;
