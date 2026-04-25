import React, { useEffect, useState } from "react";

import { useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useSecureInstance";
import Lodding from "../../../components/Lodding";

const ApplicationDeatails = () => {
  const { id } = useParams();
  console.log(id);
  const [application, setApplication] = useState(null);
  const instance = useAxiosSecure();
  const [lodding, setLodding] = useState(true);
  useEffect(() => {
    const fetch = async () => {
      try {
        setLodding(true);
        const res = await instance.get(`/applicationDeatail/${id}`);
        setApplication(res.data);
      } catch (error) {
        error(error.response.message || error.message);
      } finally {
        setLodding(false);
      }
    };
    fetch();
  }, [id]);
  console.log(application);
  if (lodding) return <Lodding></Lodding>;
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-base-content">Application Summary</h2>
          <p className="text-base-content/50 mt-1">Review your submitted application details and current status.</p>
        </div>
        <div className={`badge badge-lg rounded-xl px-6 py-4 font-bold border-none shadow-sm ${
          application?.status === 'approved' ? 'bg-success/10 text-success' : 
          application?.status === 'pending' ? 'bg-orange-500/10 text-orange-600' : 
          application?.status === 'unPaid' ? 'bg-warning/10 text-warning-content' :
          'bg-error/10 text-error'
        }`}>
          {(application?.status || 'Unknown').toUpperCase()}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Detailed Info */}
        <div className="lg:col-span-2 space-y-8">
           <div className="card-modern p-8">
              <h3 className="text-lg font-bold text-base-content mb-6 flex items-center gap-2">
                 <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                 Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-1">
                    <p className="text-[10px] uppercase font-bold text-base-content/30 tracking-wider">First Name</p>
                    <p className="font-bold text-base-content text-lg">{application?.firstName}</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] uppercase font-bold text-base-content/30 tracking-wider">Last Name</p>
                    <p className="font-bold text-base-content text-lg">{application?.lastName}</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] uppercase font-bold text-base-content/30 tracking-wider">Email Address</p>
                    <p className="font-bold text-base-content">{application?.userEmail}</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] uppercase font-bold text-base-content/30 tracking-wider">Contact Number</p>
                    <p className="font-bold text-base-content">{application?.contactNumber}</p>
                 </div>
              </div>
           </div>

           <div className="card-modern p-8">
              <h3 className="text-lg font-bold text-base-content mb-6 flex items-center gap-2">
                 <span className="w-1.5 h-6 bg-secondary rounded-full"></span>
                 Financial Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-1">
                    <p className="text-[10px] uppercase font-bold text-base-content/30 tracking-wider">Monthly Income</p>
                    <p className="font-bold text-primary text-xl">৳ {application?.monthlyIncome?.toLocaleString() || '0'}</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] uppercase font-bold text-base-content/30 tracking-wider">Income Source</p>
                    <p className="font-bold text-base-content">{application?.incomeSource || 'N/A'}</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Right Column: Loan Widget */}
        <div className="space-y-8">
           <div className="card-modern p-8 bg-primary/5 border-primary/10">
              <h3 className="text-lg font-bold text-primary mb-6">Loan Details</h3>
              <div className="space-y-6">
                 <div>
                    <p className="text-[10px] uppercase font-bold text-primary/50 tracking-wider mb-1">Product Title</p>
                    <p className="font-bold text-base-content text-lg leading-tight">{application?.loanTitle}</p>
                 </div>
                 <div className="flex justify-between items-end">
                    <div>
                       <p className="text-[10px] uppercase font-bold text-primary/50 tracking-wider mb-1">Loan Amount</p>
                       <p className="font-black text-3xl text-primary">৳ {application?.loanAmount?.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] uppercase font-bold text-primary/50 tracking-wider mb-1">Interest</p>
                       <p className="font-bold text-base-content">{application?.interestRate}%</p>
                    </div>
                 </div>
                 <div className="pt-4 border-t border-primary/10">
                    <p className="text-[10px] uppercase font-bold text-primary/50 tracking-wider mb-1">Reference ID</p>
                    <p className="text-xs font-mono text-base-content/40">{application?._id}</p>
                 </div>
              </div>
           </div>

           <button 
             onClick={() => window.history.back()}
             className="btn btn-ghost w-full rounded-2xl hover:bg-base-200"
           >
             Back to List
           </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDeatails;
