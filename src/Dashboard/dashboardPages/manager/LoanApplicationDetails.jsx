import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useSecureInstance";
import useSwal from "../../../Hooks/useSwal";

const LoanApplicationDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { err } = useSwal();

  const [application, setApplication] = useState(null);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const res = await axiosSecure.get(`/loan-application/${id}`);
        setApplication(res.data);
      } catch (error) {
        err(error.message || "Failed to load application details");
      }
    };

    fetchApplication();
  }, [id]);
  console.log(application);

  if (!application) {
    return (
      <div className="animate-pulse space-y-8">
        <div className="h-8 bg-base-200 rounded-lg w-1/4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="h-64 bg-base-200 rounded-2xl"></div>
           <div className="h-64 bg-base-200 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-base-content">Application Details</h2>
          <p className="text-base-content/50 mt-1">Full breakdown of borrower profile and request data.</p>
        </div>
        <div className={`badge badge-lg rounded-xl px-6 py-4 font-bold border-none shadow-sm ${
          application.status === 'approved' ? 'bg-success/10 text-success' : 
          application.status === 'pending' ? 'bg-orange-500/10 text-orange-600' : 
          'bg-error/10 text-error'
        }`}>
          {application.status.toUpperCase()}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Info Column */}
        <div className="lg:col-span-2 space-y-8">
           <div className="card-modern p-8">
              <h3 className="text-lg font-bold text-base-content mb-6 flex items-center gap-2">
                 <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                 Borrower Profile
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-1">
                    <p className="text-[10px] uppercase font-bold text-base-content/30 tracking-wider">Full Name</p>
                    <p className="font-bold text-base-content text-lg">{application.firstName} {application.lastName}</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] uppercase font-bold text-base-content/30 tracking-wider">Email Address</p>
                    <p className="font-bold text-base-content">{application.userEmail}</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] uppercase font-bold text-base-content/30 tracking-wider">Contact Number</p>
                    <p className="font-bold text-base-content">{application.contactNumber}</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] uppercase font-bold text-base-content/30 tracking-wider">National ID</p>
                    <p className="font-bold text-base-content">{application.nationalId}</p>
                 </div>
                 <div className="md:col-span-2 space-y-1">
                    <p className="text-[10px] uppercase font-bold text-base-content/30 tracking-wider">Residential Address</p>
                    <p className="text-base-content/80 leading-relaxed">{application.address}</p>
                 </div>
              </div>
           </div>

           <div className="card-modern p-8">
              <h3 className="text-lg font-bold text-base-content mb-6 flex items-center gap-2">
                 <span className="w-1.5 h-6 bg-secondary rounded-full"></span>
                 Financial & Employment Info
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-1">
                    <p className="text-[10px] uppercase font-bold text-base-content/30 tracking-wider">Primary Income Source</p>
                    <p className="font-bold text-base-content">{application.incomeSource}</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] uppercase font-bold text-base-content/30 tracking-wider">Monthly Income</p>
                    <p className="font-bold text-primary text-xl">৳ {application.monthlyIncome.toLocaleString()}</p>
                 </div>
                 <div className="md:col-span-2 space-y-1">
                    <p className="text-[10px] uppercase font-bold text-base-content/30 tracking-wider">Reason for Loan</p>
                    <p className="text-base-content/80 leading-relaxed italic">"{application.reason}"</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Sidebar Info Column */}
        <div className="space-y-8">
           <div className="card-modern p-8 bg-primary/5 border-primary/10">
              <h3 className="text-lg font-bold text-primary mb-6">Requested Loan</h3>
              <div className="space-y-6">
                 <div>
                    <p className="text-[10px] uppercase font-bold text-primary/50 tracking-wider mb-1">Product Title</p>
                    <p className="font-bold text-base-content text-lg leading-tight">{application.loanTitle}</p>
                 </div>
                 <div className="flex justify-between items-end">
                    <div>
                       <p className="text-[10px] uppercase font-bold text-primary/50 tracking-wider mb-1">Requested Amount</p>
                       <p className="font-black text-3xl text-primary">৳ {application.loanAmount.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] uppercase font-bold text-primary/50 tracking-wider mb-1">Interest</p>
                       <p className="font-bold text-base-content">{application.interestRate}%</p>
                    </div>
                 </div>
                 <div className="pt-4 border-t border-primary/10">
                    <p className="text-[10px] uppercase font-bold text-primary/50 tracking-wider mb-1">Officer Assigned</p>
                    <p className="text-xs font-medium text-base-content/60">{application.Officer_email}</p>
                 </div>
              </div>
           </div>

           {application.notes && (
             <div className="card-modern p-6 bg-base-200/50">
                <p className="text-[10px] uppercase font-bold text-base-content/40 tracking-wider mb-2">Internal Notes</p>
                <p className="text-sm text-base-content/70 italic">{application.notes}</p>
             </div>
           )}

           <button 
             onClick={() => window.history.back()}
             className="btn btn-ghost w-full rounded-2xl hover:bg-base-200"
           >
             Back to Applications
           </button>
        </div>
      </div>
    </div>
  );
};

export default LoanApplicationDetails;
