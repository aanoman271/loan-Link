import React from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const DashboardActivityTable = ({ role }) => {
  // Mock data for demonstration
  const recentLoans = [
    { id: "L-1001", user: "John Doe", amount: 5000, status: "Approved", date: "2024-04-20" },
    { id: "L-1002", user: "Jane Smith", amount: 12000, status: "Pending", date: "2024-04-22" },
    { id: "L-1003", user: "Mike Ross", amount: 2500, status: "Rejected", date: "2024-04-23" },
    { id: "L-1004", user: "Sarah Connor", amount: 8000, status: "Approved", date: "2024-04-24" },
    { id: "L-1005", user: "Harvey Specter", amount: 15000, status: "Pending", date: "2024-04-25" },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return <span className="badge badge-success bg-success/10 text-success border-none font-semibold px-3 py-3">Approved</span>;
      case "Pending":
        return <span className="badge badge-warning bg-warning/10 text-warning border-none font-semibold px-3 py-3">Pending</span>;
      case "Rejected":
        return <span className="badge badge-error bg-error/10 text-error border-none font-semibold px-3 py-3">Rejected</span>;
      default:
        return <span className="badge badge-ghost px-3 py-3">{status}</span>;
    }
  };

  return (
    <div className="card-modern mt-8 overflow-hidden">
      <div className="p-6 border-b border-base-content/5 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-lg text-base-content">Recent Activity</h3>
          <p className="text-sm text-base-content/50">Latest loan applications and updates</p>
        </div>
        <button className="btn btn-ghost btn-sm text-primary hover:bg-primary/10">View All</button>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200/50">
            <tr>
              <th className="text-base-content/60 font-semibold uppercase text-[11px] tracking-wider py-4">Loan ID</th>
              <th className="text-base-content/60 font-semibold uppercase text-[11px] tracking-wider py-4">Borrower</th>
              <th className="text-base-content/60 font-semibold uppercase text-[11px] tracking-wider py-4">Amount</th>
              <th className="text-base-content/60 font-semibold uppercase text-[11px] tracking-wider py-4">Date</th>
              <th className="text-base-content/60 font-semibold uppercase text-[11px] tracking-wider py-4">Status</th>
              <th className="text-base-content/60 font-semibold uppercase text-[11px] tracking-wider py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recentLoans.map((loan) => (
              <tr key={loan.id} className="hover:bg-base-200/30 transition-colors">
                <td className="font-bold text-primary">{loan.id}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                      {loan.user.charAt(0)}
                    </div>
                    <span className="font-medium">{loan.user}</span>
                  </div>
                </td>
                <td className="font-semibold">${loan.amount.toLocaleString()}</td>
                <td className="text-base-content/60 text-sm">{loan.date}</td>
                <td>{getStatusBadge(loan.status)}</td>
                <td>
                  <div className="flex justify-center gap-2">
                    <button className="btn btn-ghost btn-xs text-info hover:bg-info/10"><FaEye /></button>
                    {role !== 'Borrower' && (
                      <>
                        <button className="btn btn-ghost btn-xs text-warning hover:bg-warning/10"><FaEdit /></button>
                        <button className="btn btn-ghost btn-xs text-error hover:bg-error/10"><FaTrash /></button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardActivityTable;
