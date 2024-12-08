import React from 'react';
import { LogOut, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const TopBar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-800">Welcome, {user?.name}</h1>
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Bell size={20} />
          </button>
          <button
            onClick={logout}
            className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopBar;