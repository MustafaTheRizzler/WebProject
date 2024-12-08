import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Car, DollarSign, Calendar } from 'lucide-react';
import { fetchDashboardData } from '../utils/api';

const Dashboard = () => {
  const [data, setData] = useState<any>({
    totalRevenue: 0,
    popularCars: [],
    userActivity: []
  });

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const response = await fetchDashboardData();
        setData(response.data);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      }
    };
    loadDashboardData();
  }, []);

  const stats = [
    {
      title: 'Total Revenue',
      value: `$${data.totalRevenue.toLocaleString()}`,
      icon: <DollarSign className="text-green-500" size={24} />
    },
    {
      title: 'Total Users',
      value: data.userActivity.reduce((acc: number, curr: any) => acc + curr.count, 0),
      icon: <Users className="text-blue-500" size={24} />
    },
    {
      title: 'Active Cars',
      value: data.popularCars.length,
      icon: <Car className="text-purple-500" size={24} />
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Cars Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Most Popular Cars</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.popularCars}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Activity Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">User Distribution</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.userActivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;