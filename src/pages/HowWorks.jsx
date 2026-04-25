import React from "react";
import Section from "../reuseabble/Section";
import img from "../assets/manager.jpg";
import img2 from "../assets/multiple laons.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg";
import img6 from "../assets/img6.jpg";
const HowWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Publish Loan Offers",
      description: "Loan managers create and publish detailed loan offers, including types, interest rates, and EMI plans, ensuring full transparency for borrowers.",
      image: img,
      accent: "bg-primary/10 text-primary"
    },
    {
      id: 2,
      title: "Discover Details",
      description: "Users can explore complete loan information—from maximum limits to eligibility criteria—with a single click on 'View Details'.",
      image: img2,
      accent: "bg-secondary/10 text-secondary"
    },
    {
      id: 3,
      title: "Compare & Choose",
      description: "A centralized hub allows borrowers to compare interest rates, categories, and limits to find the loan that perfectly matches their needs.",
      image: img3,
      accent: "bg-accent/10 text-accent"
    },
    {
      id: 4,
      title: "Fast Application",
      description: "Our streamlined online process lets users submit documents and personal details securely in just a few minutes.",
      image: img4,
      accent: "bg-success/10 text-success"
    },
    {
      id: 5,
      title: "Smart Verification",
      description: "Managers efficiently review applications, verify documents, and evaluate eligibility to ensure a fair and fast approval process.",
      image: img5,
      accent: "bg-warning/10 text-warning-content"
    },
    {
      id: 6,
      title: "Instant Approval",
      description: "Once approved, borrowers are notified instantly and can proceed with their funds confidently, backed by a secure platform.",
      image: img6,
      accent: "bg-info/10 text-info"
    }
  ];

  return (
    <Section className="py-20 bg-base-200/30">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 text-sm font-bold tracking-wider text-primary uppercase bg-primary/10 rounded-full">
            The Process
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-base-content tracking-tight">
            How It <span className="text-primary italic">Works</span>
          </h2>
          <p className="max-w-2xl mx-auto text-base-content/60 text-lg leading-relaxed">
            Experience a seamless, secure, and transparent loan management journey from application to approval.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className="card-modern group p-8 relative overflow-hidden flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: `${step.id * 100}ms` }}
            >
              {/* Step Number Background */}
              <div className="absolute -top-6 -right-6 text-9xl font-black text-base-content/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                {step.id}
              </div>

              {/* Image Container */}
              <div className="relative mb-8 w-full h-48 overflow-hidden rounded-2xl shadow-lg border border-base-content/5">
                <img 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  src={step.image} 
                  alt={step.title} 
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
                
                {/* ID Badge */}
                <div className={`absolute top-4 left-4 w-10 h-10 rounded-xl ${step.accent} flex items-center justify-center font-black shadow-lg backdrop-blur-md`}>
                  {step.id}
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-base-content group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-base-content/60 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Decorative line on hover */}
              <div className="w-0 h-1 bg-primary mt-6 group-hover:w-16 transition-all duration-500 rounded-full"></div>
            </div>
          ))}
        </div>

        {/* Bottom Call to Action (Optional enhancement) */}
        <div className="mt-20 text-center">
          <div className="inline-block p-[2px] rounded-2xl bg-linear-to-r from-primary via-secondary to-accent shadow-xl shadow-primary/20">
            <div className="px-10 py-4 bg-base-100 rounded-2xl flex flex-col md:flex-row items-center gap-6">
              <p className="text-base-content/70 font-medium">Ready to start your journey?</p>
              <button className="btn btn-primary rounded-xl px-8 shadow-glow-primary">Apply for a Loan</button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default HowWorks;
