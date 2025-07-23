import React from 'react';
import Logo from '../assets/Do-Track-logo/logo-icon-light-transparent.png';

const Header = ({ user, onLogOut }) => {
  return (
    <>
      <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
        
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10">
            <img
              src={Logo}
              alt="Do Track Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-xl font-bold text-[#0ea5e9] tracking-wide hidden sm:block">
            Do Track
          </h1>
        </div>

        
        {user && (
          <div className="flex items-center space-x-4">
            <p className="text-gray-700 text-base sm:text-lg">
              Welcome, <span className="font-semibold">{user.email}</span>
            </p>
            <button
              onClick={onLogOut}
              className="bg-blue-500 hover:bg-blue-600 active:scale-95 transition text-white px-4 py-2 rounded-lg shadow"
            >
              Log out
            </button>
          </div>
        )}
      </header>

      
      <div>
        <hr className="border-t border-gray-200" />
      </div>
    </>
  );
};

export default Header;
