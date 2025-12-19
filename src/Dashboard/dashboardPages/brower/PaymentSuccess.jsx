import { useEffect } from "react";
import useInstance from "../../../Hooks/useInstance";
import { useNavigate, useSearchParams } from "react-router";

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
  }, [loanId]);

  return <h2 className="text-center text-xl">Payment Successful </h2>;
};

export default PaymentSuccess;
