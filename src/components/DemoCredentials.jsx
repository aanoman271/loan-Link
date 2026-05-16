import React from "react";
import { motion } from "framer-motion";
import { FaCopy, FaUserShield, FaUserTie, FaUserGraduate } from "react-icons/fa";
import useSwal from "../Hooks/useSwal";

const DemoCredentials = () => {
  const { toast } = useSwal();

  const credentials = [
    {
      role: "Borrower",
      email: "borrower@gmail.com",
      password: "Borrower123",
      icon: <FaUserGraduate />,
      color: "blue",
      bgColor: "bg-blue-500/10",
      textColor: "text-blue-500",
      borderColor: "group-hover:border-blue-500/30"
    },
    {
      role: "Manager",
      email: "manager@gmail.com",
      password: "Manager123",
      icon: <FaUserTie />,
      color: "purple",
      bgColor: "bg-purple-500/10",
      textColor: "text-purple-500",
      borderColor: "group-hover:border-purple-500/30"
    },
    {
      role: "Admin",
      email: "Admin@gmail.com",
      password: "Admin123",
      icon: <FaUserShield />,
      color: "red",
      bgColor: "bg-red-500/10",
      textColor: "text-red-500",
      borderColor: "group-hover:border-red-500/30"
    }
  ];

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    toast(`${label} copied!`);
  };

  return (
    <section className="py-16 bg-app-bg relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-app-text tracking-tight">
              Instant <span className="text-primary italic">Demo</span> Access
            </h2>
            <p className="text-app-text-secondary mt-3 max-w-xl mx-auto text-lg leading-relaxed">
              Explore LoanLink as different users. Click to copy credentials and sign in instantly.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {credentials.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`group card-modern p-8 flex flex-col gap-6 transition-all duration-500 hover:-translate-y-2 border border-app-border-subtle ${item.borderColor}`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl ${item.bgColor} ${item.textColor} flex items-center justify-center text-2xl shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-black text-xl text-app-text tracking-tight">{item.role}</h3>
                  <div className="h-1 w-8 bg-app-border-subtle rounded-full mt-1 group-hover:w-12 transition-all duration-500 group-hover:bg-primary/40"></div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] uppercase font-bold text-app-text-muted tracking-widest ml-1">Email Address</span>
                  <div className="flex items-center justify-between bg-app-surface-hover/40 p-3 rounded-2xl border border-app-border-subtle group-hover:bg-app-surface-hover/60 transition-all">
                    <code className="text-sm text-app-text font-medium truncate mr-3">{item.email}</code>
                    <button
                      onClick={() => handleCopy(item.email, "Email")}
                      className="text-app-text-muted hover:text-primary transition-all p-1.5 hover:bg-primary/10 rounded-lg"
                      title="Copy Email"
                    >
                      <FaCopy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] uppercase font-bold text-app-text-muted tracking-widest ml-1">Account Password</span>
                  <div className="flex items-center justify-between bg-app-surface-hover/40 p-3 rounded-2xl border border-app-border-subtle group-hover:bg-app-surface-hover/60 transition-all">
                    <code className="text-sm text-app-text font-medium">••••••••</code>
                    <button
                      onClick={() => handleCopy(item.password, "Password")}
                      className="text-app-text-muted hover:text-primary transition-all p-1.5 hover:bg-primary/10 rounded-lg"
                      title="Copy Password"
                    >
                      <FaCopy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(`${item.email} / ${item.password}`);
                  toast("All credentials copied!");
                }}
                className="btn btn-ghost btn-sm text-app-text-muted hover:text-primary hover:bg-primary/10 rounded-xl mt-2 text-xs font-bold transition-all border border-transparent hover:border-primary/20"
              >
                Copy Both
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DemoCredentials;
