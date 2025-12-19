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
    <div className="overflow-x-auto bg-white rounded-xl shadow">
      <table className="table w-full">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-3 text-left">Image </th>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Interest </th>
            <th className="p-3 text-center">Category </th>
            <th className="p-3 text-center">Created By </th>
            <th className="p-3 text-center">show on Home </th>
            <th className="p-3 text-center">Action </th>
          </tr>
        </thead>
        <tbody>
          {allLoans.length > 0 ? (
            allLoans.map((loan) => (
              <tr
                key={loan?._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-3">
                  <img
                    className="h-15 w-15 rounded-b-lg shadow-2xl"
                    src={loan?.photoUrl}
                    alt=""
                  />
                </td>
                <td className="p-3 font-medium text-gray-800">{loan?.title}</td>
                <td className="p-3 text-gray-600">{loan?.interestRate}%</td>

                <td className="p-3 text-center space-x-2">
                  <td className="flex justify-center items-center p-3 text-gray-600">
                    {loan?.category}
                  </td>
                </td>
                <td className="p-3 text-gray-600">{"loan?.interestRate"}%</td>
                <td className="p-3 text-center space-x-2">
                  <input
                    type="checkbox"
                    checked={loan?.showOnHome === true}
                    onChange={(e) => handleToggle(loan._id, e.target.checked)}
                    className="checkbox checkbox-md"
                  />
                </td>
                <td>
                  <Link
                    to={`/dashboard/update-loan/${loan._id}`}
                    className="btn btn-success"
                  >
                    Update
                  </Link>
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
  );
};

export default AdminAllLoan;
