import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <nav className="bg-yellow-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-white text-2xl font-bold">School Admin</span>
          </div>
          <div className="flex space-x-4">
            <Link to="/dashboard" className="text-yellow-100 hover:bg-yellow-700 hover:text-white px-3 py-2 rounded-md transition duration-200">
              Dashboard
            </Link>
            <Link to="/students" className="text-yellow-100 hover:bg-yellow-700 hover:text-white px-3 py-2 rounded-md transition duration-200">
              Students
            </Link>
            <Link to="/teachers" className="text-yellow-100 hover:bg-yellow-700 hover:text-white px-3 py-2 rounded-md transition duration-200">
              Teachers
            </Link>
            <Link to="/classes" className="text-yellow-100 hover:bg-yellow-700 hover:text-white px-3 py-2 rounded-md transition duration-200">
              Classes
            </Link>
            <Link to="/transactions" className="text-yellow-100 hover:bg-yellow-700 hover:text-white px-3 py-2 rounded-md transition duration-200">
              Transactions
            </Link>
            <Link to="/device-verification" className="text-yellow-100 hover:bg-yellow-700 hover:text-white px-3 py-2 rounded-md transition duration-200">
              Device Verification
            </Link>
            <Link to="/academic-records" className="text-yellow-100 hover:bg-yellow-700 hover:text-white px-3 py-2 rounded-md transition duration-200">
              Academic Records
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
