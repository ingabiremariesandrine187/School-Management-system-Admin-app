import React, { useState, useEffect } from 'react';
import { dashboardService } from '../services/dashboardService';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await dashboardService.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">
      <div className="text-xl text-gray-600">Loading...</div>
    </div>;
  }

  const statCards = [
    { title: 'Total Students', value: stats?.totalStudents || 0, color: 'bg-yellow-500' },
    { title: 'Total Teachers', value: stats?.totalTeachers || 0, color: 'bg-yellow-600' },
    { title: 'Total Classes', value: stats?.totalClasses || 0, color: 'bg-orange-500' },
    { title: 'Fee Collection', value: `$${stats?.totalFeeCollection || 0}`, color: 'bg-amber-500' },
    { title: 'Attendance Rate', value: `${stats?.attendanceRate || 0}%`, color: 'bg-yellow-400' },
    { title: 'Pending Transactions', value: stats?.pendingTransactions || 0, color: 'bg-orange-600' }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-200">
            <div className={`${stat.color} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
              <span className="text-white text-xl font-bold">{stat.value.toString().charAt(0)}</span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium uppercase mb-2">{stat.title}</h3>
            <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
