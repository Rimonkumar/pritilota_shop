'use client';

import React, { useEffect, useState } from 'react';
import { 
  Users, 
  ShoppingBag, 
  DollarSign, 
  TrendingUp, 
  Package, 
  CheckCircle, 
  Clock, 
  AlertCircle 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { formatPrice } from '@/lib/utils';

const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4"
  >
    <div className="flex items-center justify-between">
      <div className={`p-3 rounded-2xl ${color} bg-opacity-10 text-opacity-100`}>
        <Icon size={24} className={color.replace('bg-', 'text-')} />
      </div>
      {trend && (
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
          {trend > 0 ? '+' : ''}{trend}%
        </span>
      )}
    </div>
    <div>
      <p className="text-sm text-gray-500 font-medium">{title}</p>
      <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
    </div>
  </motion.div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch from API
    // For now, demo data
    setTimeout(() => {
      setStats({
        totalSales: 54320,
        totalOrders: 124,
        totalUsers: 850,
        totalProducts: 45,
      });
      setRecentOrders([
        { id: '#ORD-7823', customer: 'John Doe', date: 'Oct 12, 2023', status: 'Delivered', amount: 299.99 },
        { id: '#ORD-7824', customer: 'Sarah Smith', date: 'Oct 12, 2023', status: 'Processing', amount: 150.00 },
        { id: '#ORD-7825', customer: 'Mike Johnson', date: 'Oct 11, 2023', status: 'Shipped', amount: 450.00 },
        { id: '#ORD-7826', customer: 'Emma Wilson', date: 'Oct 11, 2023', status: 'Pending', amount: 89.99 },
      ] as any);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <div className="p-20 text-center animate-pulse">Loading Admin Insights...</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500">Welcome back! Here's what's happening today.</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center space-x-2">
          <TrendingUp size={20} />
          <span>Generate Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard title="Total Revenue" value={formatPrice(stats.totalSales)} icon={DollarSign} color="bg-blue-600" trend={12} />
        <StatCard title="Total Orders" value={stats.totalOrders} icon={ShoppingBag} color="bg-purple-600" trend={8} />
        <StatCard title="Total Customers" value={stats.totalUsers} icon={Users} color="bg-green-600" trend={5} />
        <StatCard title="Live Products" value={stats.totalProducts} icon={Package} color="bg-orange-600" />
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
            <button className="text-blue-600 font-bold text-sm hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-widest font-bold">
                  <th className="px-8 py-4">Order ID</th>
                  <th className="px-8 py-4">Customer</th>
                  <th className="px-8 py-4">Date</th>
                  <th className="px-8 py-4">Amount</th>
                  <th className="px-8 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentOrders.map((order: any) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-5 font-bold text-blue-600">{order.id}</td>
                    <td className="px-8 py-5 text-gray-900 font-medium">{order.customer}</td>
                    <td className="px-8 py-5 text-gray-500 text-sm">{order.date}</td>
                    <td className="px-8 py-5 font-bold text-gray-900">{formatPrice(order.amount)}</td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-600' :
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-600' :
                        order.status === 'Shipped' ? 'bg-purple-100 text-purple-600' :
                        'bg-orange-100 text-orange-600'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Status / Quick Actions */}
        <div className="space-y-8">
           <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                 <button className="flex flex-col items-center justify-center p-4 rounded-2xl bg-gray-50 hover:bg-blue-50 hover:text-blue-600 transition-all border border-gray-100 space-y-2">
                    <Package size={24} />
                    <span className="text-xs font-bold">Add Product</span>
                 </button>
                 <button className="flex flex-col items-center justify-center p-4 rounded-2xl bg-gray-50 hover:bg-blue-50 hover:text-blue-600 transition-all border border-gray-100 space-y-2">
                    <Users size={24} />
                    <span className="text-xs font-bold">Manage Users</span>
                 </button>
                 <button className="flex flex-col items-center justify-center p-4 rounded-2xl bg-gray-50 hover:bg-blue-50 hover:text-blue-600 transition-all border border-gray-100 space-y-2">
                    <DollarSign size={24} />
                    <span className="text-xs font-bold">View Sales</span>
                 </button>
                 <button className="flex flex-col items-center justify-center p-4 rounded-2xl bg-gray-50 hover:bg-blue-50 hover:text-blue-600 transition-all border border-gray-100 space-y-2">
                    <TrendingUp size={24} />
                    <span className="text-xs font-bold">Analytics</span>
                 </button>
              </div>
           </div>

           <div className="bg-gray-900 text-white p-8 rounded-3xl space-y-6">
              <h2 className="text-xl font-bold">System Health</h2>
              <div className="space-y-4">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                       <CheckCircle size={18} className="text-green-500" />
                       <span className="text-sm font-medium text-gray-400">Database</span>
                    </div>
                    <span className="text-xs font-bold text-green-500">OPTIMAL</span>
                 </div>
                 <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                       <Clock size={18} className="text-blue-500" />
                       <span className="text-sm font-medium text-gray-400">Server Latency</span>
                    </div>
                    <span className="text-xs font-bold">24ms</span>
                 </div>
                 <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                       <AlertCircle size={18} className="text-orange-500" />
                       <span className="text-sm font-medium text-gray-400">Storage</span>
                    </div>
                    <span className="text-xs font-bold">85% Full</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
