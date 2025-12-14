import React from "react";

const AddLoanManager = () => {
  const handleAddLoan = (e) => {
    e.preventDefault();
    const form = e.target;

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
    };

    console.log(loanData);
    form.reset();
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add New Loan</h1>

      <form
        onSubmit={handleAddLoan}
        className="bg-white p-6 rounded-xl shadow space-y-5"
      >
        {/* Loan Title */}
        <div>
          <label className="font-medium">Loan Title</label>
          <input
            name="title"
            className="w-full mt-1 p-3 border rounded-lg"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-medium">Description</label>
          <textarea
            name="description"
            rows="3"
            className="w-full mt-1 p-3 border rounded-lg"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="font-medium">Category</label>
          <select
            name="category"
            className="w-full mt-1 p-3 border rounded-lg"
            required
          >
            <option value="">Select Category</option>
            <option value="Personal">Personal</option>
            <option value="Home">Home</option>
            <option value="Car">Car</option>
            <option value="Business">Business</option>
          </select>
        </div>

        {/* Interest Rate & Max Limit */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="font-medium">Interest Rate (%)</label>
            <input
              type="number"
              name="interestRate"
              className="w-full mt-1 p-3 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="font-medium">Max Loan Limit</label>
            <input
              type="number"
              name="maxLimit"
              className="w-full mt-1 p-3 border rounded-lg"
              required
            />
          </div>
        </div>

        {/* Required Documents */}
        <div>
          <label className="font-medium">Required Documents</label>
          <input
            name="documents"
            placeholder="NID, Bank Statement, Salary Slip"
            className="w-full mt-1 p-3 border rounded-lg"
          />
        </div>

        {/* EMI Plans */}
        <div>
          <label className="font-medium">EMI Plans</label>
          <input
            name="emiPlans"
            placeholder="6, 12, 24 months"
            className="w-full mt-1 p-3 border rounded-lg"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="font-medium">Upload Images</label>
          <input
            type="file"
            multiple
            className="w-full mt-1 file-input file-input-bordered"
          />
        </div>

        {/* Show on Home */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="showOnHome"
            className="toggle toggle-primary"
          />
          <span>Show on Home Page</span>
        </div>

        {/* Submit */}
        <button className="btn btn-primary w-full">Add Loan</button>
      </form>
    </div>
  );
};

export default AddLoanManager;
