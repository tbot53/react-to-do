import React, { useState } from 'react'

const Header = ({user, onLogOut}) => {
    
  return (
    <>
        <header className="bg-gray-100 p-4 shadow-md flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Task Manager</h1>
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