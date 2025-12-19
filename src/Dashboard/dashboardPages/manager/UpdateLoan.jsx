import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../../../Hooks/useSecureInstance";
import useSwal from "../../../Hooks/useSwal";

const UpdateLoan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const instance = useAxiosSecure();
  const { success } = useSwal();

  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);

  //   🔹 Fetch single loan
  useEffect(() => {
    instance.get(`/loans/${id}`).then((res) => {
      setLoan(res.data);
      setLoading(false);
    });
  }, [id]);

  // 🔹 Update loan
  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = e.target;

    const updatedLoan = {
      title: form.title.value,
      category: form.category.value,
      interestRate: form.interestRate.value,
      maxLimit: form.maxLimit.value,
      description: form.description.value,
    };

    await instance.patch(`/loans/${id}`, updatedLoan);
    success("Loan updated successfully");
    navigate(-1);
  };

  // 🔹 Delete loan with confirmation

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-[800px] mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Update Loan</h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          name="title"
          defaultValue={loan?.title}
          placeholder="Loan Title"
          className="w-full border px-4 py-2 rounded"
        />

        <input
          name="category"
          defaultValue={loan?.category}
          placeholder="Category"
          className="w-full border px-4 py-2 rounded"
        />

        <input
          name="interestRate"
          defaultValue={loan?.interestRate}
          placeholder="Interest Rate (%)"
          className="w-full border px-4 py-2 rounded"
        />

        <input
          name="maxLimit"
          defaultValue={loan?.maxLimit}
          placeholder="Max Loan Limit"
          className="w-full border px-4 py-2 rounded"
        />

        <textarea
          name="description"
          defaultValue={loan?.description}
          placeholder="Description"
          className="w-full border px-4 py-2 rounded"
        />

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            Update Loan
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateLoan;
