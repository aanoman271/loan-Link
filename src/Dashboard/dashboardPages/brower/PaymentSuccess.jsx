import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import useInstance from "../../../Hooks/useInstance";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const loanId = params.get("loanId");
  const instance = useInstance();
  const navigate = useNavigate();

  useEffect(() => {
    const updatePayment = async () => {
      await instance.patch(`/loan/${loanId}/pay`);
      navigate("/dashboard/my-Loan");
    };
    setTimeout(() => {
      updatePayment();
    }, 2000);
  }, [loanId, instance, navigate]);

  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center justify-center p-6 animate-in fade-in duration-1000">
      <div className="card-modern max-w-md w-full p-12 text-center relative overflow-hidden">
        {/* Success Animation Ring */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-linear-to-r from-transparent via-success to-transparent"></div>
        
        <div className="w-24 h-24 bg-success/10 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-bounce duration-[2000ms]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="text-4xl font-black text-base-content mb-4 tracking-tight">Payment Received!</h2>
        <p className="text-base-content/60 leading-relaxed mb-8">
          Your loan application fee has been processed successfully. Your application is now ready for review.
        </p>

        <div className="space-y-4">
           <div className="flex items-center justify-center gap-3 py-3 px-6 bg-base-200 rounded-2xl border border-base-content/5">
              <span className="loading loading-ring loading-md text-primary"></span>
              <p className="text-sm font-bold text-base-content/70">Redirecting to dashboard...</p>
           </div>
           
           <button 
             onClick={() => navigate("/dashboard/my-Loan")}
             className="btn btn-primary btn-block rounded-2xl h-14 text-lg shadow-lg shadow-primary/20"
           >
             Return Home Now
           </button>
        </div>

        <div className="mt-8 pt-8 border-t border-base-content/5">
           <p className="text-[10px] uppercase font-bold text-base-content/30 tracking-widest">Transaction Secured by Stripe</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
