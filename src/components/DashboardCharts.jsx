import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";

const data = [
  { name: "Jan", loans: 4000, revenue: 2400 },
  { name: "Feb", loans: 3000, revenue: 1398 },
  { name: "Mar", loans: 2000, revenue: 9800 },
  { name: "Apr", loans: 2780, revenue: 3908 },
  { name: "May", loans: 1890, revenue: 4800 },
  { name: "Jun", loans: 2390, revenue: 3800 },
  { name: "Jul", loans: 3490, revenue: 4300 },
];

const COLORS = ["#0ea5e9", "#6366f1", "#f43f5e", "#10b981", "#f59e0b"];

const DashboardCharts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      {/* Area Chart - Loan Activity */}
      <div className="card-modern p-6 h-[400px] flex flex-col">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-lg text-base-content">Loan Performance</h3>
            <p className="text-sm text-base-content/50">Monthly loan volume vs revenue</p>
          </div>
          <select className="select select-sm select-bordered rounded-lg bg-base-200 border-none">
            <option>Last 7 Months</option>
            <option>Last Year</option>
          </select>
        </div>
        <div className="flex-1 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorLoans" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'rgba(0,0,0,0.4)', fontSize: 12 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'rgba(0,0,0,0.4)', fontSize: 12 }} 
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '16px', 
                  border: 'none', 
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                  padding: '12px'
                }} 
              />
              <Area
                type="monotone"
                dataKey="loans"
                stroke="#0ea5e9"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorLoans)"
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#6366f1"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart - Distributions */}
      <div className="card-modern p-6 h-[400px] flex flex-col">
        <div className="mb-6">
          <h3 className="font-bold text-lg text-base-content">User Distribution</h3>
          <p className="text-sm text-base-content/50">Activity per user segment</p>
        </div>
        <div className="flex-1 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'rgba(0,0,0,0.4)', fontSize: 12 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'rgba(0,0,0,0.4)', fontSize: 12 }} 
              />
              <Tooltip 
                cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                contentStyle={{ 
                  borderRadius: '16px', 
                  border: 'none', 
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                  padding: '12px'
                }} 
              />
              <Bar dataKey="loans" radius={[8, 8, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
