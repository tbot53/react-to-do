import React from 'react'

const Body = (props) => { 
  const Tasks = props.content.map((task) => {
    const createdTime = new Date(task.createdAt).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    
    return (
      <div key={task.id} style={{ backgroundColor: task.color }} className={`flex space-x-2  p-2 rounded-lg`}>
        <label>
          <input
            type="checkbox"
            name={`entry${task.id}`}
            id={task.id}
            className="w-6 h-6"
            disabled={props.viewCompleted}
            onChange={() => props.onCheckboxChange(task.id)}
            checked={props.selectedIds?.includes(task.id)}
          />
        </label>
        <div>
          <p className='font-bold uppercase'>{task.title}</p>
          <p>{task.desc}</p>
          {/* <p className="text-sm text-gray-600">Created at: {createdTime}</p>  */}
          <p className="text-sm text-gray-600">
            Created at:{' '}
            {task.created_at
              ? new Date(task.created_at).toLocaleString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true,
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })
              : 'No date'}
          </p>


        </div>
      </div>
    );
  });
  
  
  return (
    <main className='bg-[#F2F6FC] py-4 px-2'>

      {/* div containng the tasks  */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
        {Tasks}

        <button className='text-4xl bg-blue-300 flex items-center justify-center rounded-lg px-2 pb-2 shadow-md' onClick={()=>props.addFunction()}>Add a new task +</button>
      </div>
    </main>
  )
}

export default Body