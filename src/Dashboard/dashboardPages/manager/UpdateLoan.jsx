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

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto animate-pulse space-y-8">
        <div className="h-8 bg-base-200 rounded-lg w-1/4"></div>
        <div className="h-[500px] bg-base-200 rounded-2xl"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-base-content">Update Loan Product</h2>
          <p className="text-base-content/50 mt-1">Modify the terms and conditions of this loan offering.</p>
        </div>
        <button 
          onClick={() => navigate(-1)}
          className="btn btn-ghost btn-sm rounded-xl hover:bg-base-200"
        >
          Go Back
        </button>
      </div>

      <form onSubmit={handleUpdate} className="card-modern p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="form-control">
            <label className="label font-bold text-sm text-base-content/70">Loan Title</label>
            <input
              name="title"
              defaultValue={loan?.title}
              placeholder="e.g. Premium Home Loan"
              className="input input-bordered rounded-xl bg-base-200 border-none focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>

          <div className="form-control">
            <label className="label font-bold text-sm text-base-content/70">Category</label>
            <select
              name="category"
              defaultValue={loan?.category}
              className="select select-bordered rounded-xl bg-base-200 border-none focus:ring-2 focus:ring-primary/20"
              required
            >
              <option value="Personal">Personal</option>
              <option value="Home">Home</option>
              <option value="Car">Car</option>
              <option value="Business">Business</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label font-bold text-sm text-base-content/70">Interest Rate (%)</label>
            <input
              name="interestRate"
              type="number"
              step="0.01"
              defaultValue={loan?.interestRate}
              placeholder="e.g. 5.5"
              className="input input-bordered rounded-xl bg-base-200 border-none focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>

          <div className="form-control">
            <label className="label font-bold text-sm text-base-content/70">Max Loan Limit (৳)</label>
            <input
              name="maxLimit"
              type="number"
              defaultValue={loan?.maxLimit}
              placeholder="e.g. 500000"
              className="input input-bordered rounded-xl bg-base-200 border-none focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label font-bold text-sm text-base-content/70">Description</label>
          <textarea
            name="description"
            defaultValue={loan?.description}
            rows="4"
            placeholder="Describe the loan benefits..."
            className="textarea textarea-bordered rounded-xl bg-base-200 border-none focus:ring-2 focus:ring-primary/20"
            required
          />
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t border-base-content/5">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn btn-ghost rounded-xl px-8"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary rounded-xl px-12 shadow-lg shadow-primary/20"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateLoan;
