import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    
  return (
    <nav className="bg-gradient-to-r from-blue-400 to-purple-500 p-4 flex items-center justify-between">
      <div className="flex items-center">
        <div className="text-white text-2xl font-bold">Expense Tracker</div>
      </div>
      <div className="flex items-center">
        <div className="mr-4 cursor-pointer" >
        <Link to="/update">
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" // Replace with the path to your profile icon image
            alt="Profile Icon"
            className="w-8 h-8 rounded-full"
          />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
