import React, { useState } from 'react'
import Logo from '../assets/Do-Track-logo/logo-icon-light-transparent.png'

const Header = ({user, onLogOut}) => {
    
  return (
    <>
        <header className="bg-gray-100 p-4 shadow-md flex justify-between items-center">
           
          <div className='flex flex-col space-y-1'>
            
            <div className='w-10 h-10'>
              <img src={Logo} alt="Do Track Logo" className='w-full h-full object-contain' />
            </div>
            {/* <h1 className="text-lg font-bold text-[#8aecf3]">Do Track</h1>    */}

          </div>
          
          {user && (
            <div className='flex space-x-2 items-center'>
              <p className="text-lg">
                Welcome, <span className="font-semibold">{user.email}</span>
              </p>
              <button onClick={onLogOut} className="bg-blue-500 text-white hover:bg-blue-700 px-3 py-2 rounded-lg shadow-md">
                Log out
              </button>
            </div>
          )}
        </header>
        <div>
            <hr className='border-b-1 border-gray-500' />
        </div>


    
    </>
    
    
  )
}

export default Header