import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const sampleData = [
  { date: "Jan", value: 4000 },
  { date: "Feb", value: 3000 },
  { date: "Mar", value: 5000 },
  { date: "Apr", value: 2000 },
  { date: "May", value: 3500 },
  { date: "Jun", value: 6000 }
];

const DashboardGraph = () => {
  return (
    <div style={{ width: "100%", height: 300, padding: "20px" }}>
      <h3>Monthly Activity Chart</h3>
      <ResponsiveContainer>
        <LineChart data={sampleData}>
          <Line type="monotone" dataKey="value" stroke="#ff5733" strokeWidth={2} />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardGraph;
