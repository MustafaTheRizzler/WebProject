import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, Car } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { to: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/users', icon: <Users size={20} />, label: 'Users' },
    { to: '/bookings', icon: <Calendar size={20} />, label: 'Bookings' },
    { to: '/cars', icon: <Car size={20} />, label: 'Cars' },
  ];

  return (
    <div className="bg-gray-900 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <div className="flex items-center justify-center space-x-2 px-4">
        <Car size={24} />
        <span className="text-2xl font-semibold">Admin Panel</span>
      </div>
      <nav className="space-y-1 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center space-x-2 px-4 py-2.5 rounded transition duration-200 ${
                isActive
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;