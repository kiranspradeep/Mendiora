import React from 'react';
import { BarChart, Bar, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './OrganizerDashboard.css';

const OrganizerDashboard = () => {
  // Sample data for graphs
  const data = [
    { name: 'Jan', impressions: 12000, followers: 300 },
    { name: 'Feb', impressions: 15000, followers: 350 },
    { name: 'Mar', impressions: 17000, followers: 400 },
    { name: 'Apr', impressions: 14000, followers: 450 },
    { name: 'May', impressions: 20000, followers: 500 },
    { name: 'Jun', impressions: 22000, followers: 550 },
  ];

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Analytics Dashboard</h2>

      <div className="stats-container">
        <div className="stat-card">
          <h3>Venues</h3>
          <p>16,380</p>
          <span className="stat-percentage">+1.92%</span>
        </div>

        <div className="stat-card">
          <h3>Events</h3>
          <p>12,200</p>
          <span className="stat-percentage">+4.55%</span>
        </div>

        <div className="stat-card">
          <h3>Orders</h3>
          <p>10,800</p>
          <span className="stat-percentage">+4.55%</span>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-wrapper">
          <h4>Impressions</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="impressions" fill="#4285F4" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-wrapper">
          <h4>Followers over time</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="followers" stroke="#34A853" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;
