import React from 'react'

const SectionBtn = ({ viewCompleted, setViewCompleted }) => {
  return (
    <div className='flex lg:flex-col lg:space-x-0 lg:space-y-2 items-center justify-center space-x-3 text-2xl bg-[#F2F6FC]'>
        <button
          onClick={() => setViewCompleted(false)}
          className={`px-3 border-b-2 ${!viewCompleted ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'}`}
        >ACTIVE </button>
        <button
          onClick={() => setViewCompleted(true)}
          className={`px-3 border-b-2 ${viewCompleted ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'}`}
        >COMPLETED</button>
    </div>
  )
}

export default SectionBtn