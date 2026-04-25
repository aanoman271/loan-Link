import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useSecureInstance";
import useSwal from "../../../Hooks/useSwal";
import useImgbb from "../../../reuseabble/useImgbb";
import useAuth from "../../../Hooks/useAuth";

const AddLoanManager = () => {
  const [addLoanErr, setAddLoanErr] = useState("");
  const { success } = useSwal();
  const { user } = useAuth();
  const imgbb = useImgbb();
  const axiosSecure = useAxiosSecure();
  const handleAddLoan = async (e) => {
    e.preventDefault();
    const form = e.target;
    const photo = form.photo.files[0];
    if (!photo) {
      return setAddLoanErr("picture cant added");
    }
    const photoUrl = await imgbb(photo);

    const loanData = {
      title: form.title.value,
      description: form.description.value,
      category: form.category.value,
      interestRate: form.interestRate.value,
      maxLimit: form.maxLimit.value,
      documents: form.documents.value,
      emiPlans: form.emiPlans.value,
      showOnHome: form.showOnHome.checked,
      date: new Date().toISOString(),
      photoUrl,
      email: user?.email,
    };

    console.log(loanData);
    try {
      await axiosSecure.post("/manager/addloan", loanData);
    } catch (error) {
      setAddLoanErr(error?.response?.data?.message || error.message);
    }
    success("laon successfully created");

    form.reset();
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-base-content">Create New Loan Product</h1>
        <p className="text-base-content/50 mt-1">Fill in the details below to launch a new loan category for borrowers.</p>
      </div>

      <form
        onSubmit={handleAddLoan}
        className="card-modern p-8 space-y-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Basic Info */}
          <div className="space-y-6">
             <div className="form-control">
               <label className="label font-bold text-sm text-base-content/70">Loan Title</label>
               <input
                 name="title"
                 placeholder="e.g. Premium Home Loan"
                 className="input input-bordered rounded-xl bg-base-200 border-none focus:ring-2 focus:ring-primary/20"
                 required
               />
             </div>

             <div className="form-control">
               <label className="label font-bold text-sm text-base-content/70">Category</label>
               <select
                 name="category"
                 className="select select-bordered rounded-xl bg-base-200 border-none focus:ring-2 focus:ring-primary/20"
                 required
               >
                 <option value="" disabled selected>Select Category</option>
                 <option value="Personal">Personal</option>
                 <option value="Home">Home</option>
                 <option value="Car">Car</option>
                 <option value="Business">Business</option>
               </select>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label font-bold text-sm text-base-content/70">Interest (%)</label>
                  <input
                    type="number"
                    name="interestRate"
                    placeholder="5.5"
                    step="0.01"
                    className="input input-bordered rounded-xl bg-base-200 border-none focus:ring-2 focus:ring-primary/20"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label font-bold text-sm text-base-content/70">Max Limit ($)</label>
                  <input
                    type="number"
                    name="maxLimit"
                    placeholder="50000"
                    className="input input-bordered rounded-xl bg-base-200 border-none focus:ring-2 focus:ring-primary/20"
                    required
                  />
                </div>
             </div>
          </div>

          {/* Right Column: Requirements & Images */}
          <div className="space-y-6">
             <div className="form-control">
               <label className="label font-bold text-sm text-base-content/70">Required Documents</label>
               <input
                 name="documents"
                 placeholder="NID, Bank Statement, Salary Slip"
                 className="input input-bordered rounded-xl bg-base-200 border-none focus:ring-2 focus:ring-primary/20"
               />
             </div>

             <div className="form-control">
               <label className="label font-bold text-sm text-base-content/70">EMI Plans (Months)</label>
               <input
                 name="emiPlans"
                 placeholder="e.g. 6, 12, 24"
                 className="input input-bordered rounded-xl bg-base-200 border-none focus:ring-2 focus:ring-primary/20"
               />
             </div>

             <div className="form-control">
               <label className="label font-bold text-sm text-base-content/70">Cover Image</label>
               <input
                 type="file"
                 name="photo"
                 className="file-input file-input-bordered rounded-xl bg-base-200 border-none w-full"
               />
               <label className="label">
                 <span className="label-text-alt text-base-content/40 uppercase font-bold text-[10px]">JPG, PNG supported</span>
               </label>
             </div>
          </div>
        </div>

        <div className="form-control">
          <label className="label font-bold text-sm text-base-content/70">Description</label>
          <textarea
            name="description"
            rows="4"
            placeholder="Detailed description of the loan benefits and terms..."
            className="textarea textarea-bordered rounded-xl bg-base-200 border-none focus:ring-2 focus:ring-primary/20"
            required
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-4 border-t border-base-content/5">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="showOnHome"
              className="toggle toggle-primary toggle-sm"
            />
            <span className="text-sm font-medium text-base-content/70">Display this loan on Home Page</span>
          </div>
          
          <div className="flex items-center gap-4">
             <button type="button" className="btn btn-ghost rounded-xl px-8" onClick={() => window.history.back()}>Cancel</button>
             <button type="submit" className="btn btn-primary rounded-xl px-12 shadow-lg shadow-primary/20">Create Loan Product</button>
          </div>
        </div>
        
        {addLoanErr && (
          <p className="text-sm text-error font-bold text-center mt-4 bg-error/10 py-2 rounded-lg">{addLoanErr}</p>
        )}
      </form>
    </div>
  );
};

export default AddLoanManager;
