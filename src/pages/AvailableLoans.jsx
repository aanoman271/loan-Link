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
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-3xl md:text-5xl font-black text-base-content tracking-tight">
          Available <span className="text-primary italic">Loans</span>
        </h2>
        <p className="text-base-content/60 text-lg max-w-2xl mx-auto leading-relaxed">
          Explore our curated selection of loan plans tailored to your specific needs.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {availableLaon.map((loan) => (
          <LoanCard key={loan._id} loan={loan}></LoanCard>
        ))}
      </div>
    </Section>
  );
};

export default AvailableLoans;
