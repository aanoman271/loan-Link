import React, { useEffect, useState } from "react";
import Section from "../reuseabble/Section";
import useInstance from "../Hooks/useInstance";
import LoanCard from "../components/LoanCard";
const AvailableLoans = () => {
  const [availableLaon, setAvialableLoan] = useState([]);
  const instance = useInstance();
  useEffect(() => {
    const fetch = async () => {
      const promise = await instance.get("/availableLoans");

      setAvialableLoan(promise.data);
    };
    fetch();
  }, []);
  console.log(availableLaon);
  return (
    <Section>
      <div>
        <h2 className="text-3xl font-bold mb-6 text-center">Available Lon</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {availableLaon.map((loan) => (
            <LoanCard key={loan._id} loan={loan}></LoanCard>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default AvailableLoans;
