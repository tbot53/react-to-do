import React from 'react'

const ControlBtn = (props) => {
    const baseClass = `text-white px-4 py-2 rounded-lg shadow-md`
    const isDisabled = props.disability
  return (
    <div className='flex items-center justify-center pt-3 space-x-4'>
        <button onClick={props.removeTask} className={`${baseClass} ${isDisabled ? 'bg-red-200 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'}`}disabled={isDisabled}>Delete Task</button>
        <button onClick={props.markTaskCompleted} className={`${baseClass} ${isDisabled ? 'bg-blue-200 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}disabled={isDisabled}>Completed Task</button>
    </div>
  )
}

export default ControlBtn