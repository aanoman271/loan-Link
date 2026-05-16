import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  IoArrowBackOutline, 
  IoCashOutline, 
  IoCalendarOutline, 
  IoStatsChartOutline, 
  IoPricetagOutline,
  IoInformationCircleOutline,
  IoCheckmarkCircleOutline,
  IoChevronForwardOutline
} from "react-icons/io5";
import useAxiosSecure from "../Hooks/useSecureInstance";
import Lodding from "../components/Lodding";

const LoanDetailsPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoan = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get(`/loanDeatails/${id}`);
        setLoan(res.data);
      } catch (error) {
        console.error(error);
        navigate("/allLoan");
      } finally {
        setLoading(false);
      }
    };

    fetchLoan();
  }, [id, axiosSecure, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-app-bg flex flex-col items-center justify-center p-6">
        <Lodding />
        <p className="mt-4 text-app-text-muted font-medium animate-pulse">Retrieving loan details...</p>
      </div>
    );
  }

  if (!loan) return null;

  const detailItems = [
    {
      icon: <IoPricetagOutline className="w-5 h-5" />,
      label: "Category",
      value: loan?.category,
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      icon: <IoStatsChartOutline className="w-5 h-5" />,
      label: "Interest Rate",
      value: `${loan?.interestRate}%`,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    },
    {
      icon: <IoCashOutline className="w-5 h-5" />,
      label: "Max Limit",
      value: `৳ ${loan?.maxLimit?.toLocaleString()}`,
      color: "text-amber-500",
      bg: "bg-amber-500/10"
    },
    {
      icon: <IoCalendarOutline className="w-5 h-5" />,
      label: "EMI Plans",
      value: `${loan?.emiPlans} Months`,
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    }
  ];

  return (
    <div className="min-h-screen bg-app-bg pb-20">
      {/* Header / Navigation */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <button 
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-app-text-secondary hover:text-primary transition-colors mb-8 font-medium"
        >
          <div className="w-10 h-10 rounded-xl bg-app-surface border border-app-border-subtle flex items-center justify-center group-hover:border-primary/30 group-hover:bg-primary/5 transition-all">
            <IoArrowBackOutline className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          </div>
          <span>Back to Loans</span>
        </button>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column - Hero & Main Info */}
          <div className="lg:col-span-8 space-y-8">
            <div className="card-modern overflow-hidden">
              <div className="relative h-64 md:h-[400px]">
                <img
                  src={loan?.photoUrl}
                  alt={loan?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/90 backdrop-blur-md text-white text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
                    <IoPricetagOutline />
                    {loan?.category}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">
                    {loan?.title}
                  </h1>
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <IoInformationCircleOutline className="text-primary w-5 h-5" />
                  <h2 className="text-xl font-bold text-app-text">About this Loan</h2>
                </div>
                <p className="text-app-text-secondary leading-relaxed text-lg mb-8">
                  {loan?.description}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {detailItems.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-app-surface-hover/50 border border-app-border-subtle group hover:border-primary/20 transition-colors">
                      <div className={`w-10 h-10 ${item.bg} ${item.color} rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110`}>
                        {item.icon}
                      </div>
                      <p className="text-[10px] uppercase font-bold text-app-text-muted tracking-wider mb-1">{item.label}</p>
                      <p className="text-base font-black text-app-text">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Eligibility / Features Section */}
            <div className="card-modern p-8">
              <h3 className="text-xl font-bold text-app-text mb-6 flex items-center gap-2">
                <IoCheckmarkCircleOutline className="text-emerald-500 w-6 h-6" />
                Key Benefits & Features
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Quick online application process",
                  "Competitive interest rates",
                  "Flexible repayment options",
                  "Minimal documentation required",
                  "No hidden charges or processing fees",
                  "Fast approval within 24-48 hours"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-app-surface-hover/30 border border-transparent hover:border-app-border transition-all">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-app-text-secondary font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Summary & Action */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <div className="card-modern p-8 bg-gradient-to-br from-app-surface to-app-surface-hover">
              <h3 className="text-xl font-bold text-app-text mb-6">Application Summary</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-3 border-b border-app-border-subtle">
                  <span className="text-app-text-secondary font-medium">Interest Rate</span>
                  <span className="text-app-text font-bold">{loan?.interestRate}% p.a.</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-app-border-subtle">
                  <span className="text-app-text-secondary font-medium">Max Loan Amount</span>
                  <span className="text-app-text font-bold">৳ {loan?.maxLimit?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-app-border-subtle">
                  <span className="text-app-text-secondary font-medium">Processing Time</span>
                  <span className="text-emerald-500 font-bold">Instantly</span>
                </div>
              </div>

              <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10 mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <IoInformationCircleOutline />
                  </div>
                  <p className="font-bold text-app-text text-sm">Need Help?</p>
                </div>
                <p className="text-xs text-app-text-secondary leading-relaxed">
                  Our loan experts are available to assist you with your application 24/7.
                </p>
              </div>

              <button
                onClick={() =>
                  navigate("/laonApplication", {
                    state: {
                      interestRate: loan?.interestRate,
                      title: loan?.title,
                      loanId: loan?._id,
                      loanOfficer_email: loan?.email,
                    },
                  })
                }
                className="w-full group bg-primary hover:bg-primary-focus text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 flex items-center justify-center gap-2 active:scale-95"
              >
                Apply for this Loan
                <IoChevronForwardOutline className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
              
              <p className="text-center text-[10px] text-app-text-muted mt-4 font-medium uppercase tracking-widest">
                Secure & encrypted application
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanDetailsPage;
