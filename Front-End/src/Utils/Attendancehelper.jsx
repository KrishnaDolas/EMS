import React from 'react'


export const columns=[
    {
        name :'Sr No',
        selector:(row)=> row.srno,
        width:'80px'
    },

    {
        name :'Name',
        selector:(row)=> row.name,
        sortable:true,
        width:'200px'
    },

    {
        name :'Department',
        selector:(row)=> row.department,
         width:'150px'
    },

    {
        name :'Action',
        selector:(row)=> row.action
    },
]

export const Attendancehelper = ({status}) => {
  return (
    <div>
        {status == null ? (
    <div className='flex space-x-8'>
        <button className='px-4 py-2 bg-green-500 text-white'>Present</button>
        <button className='px-4 py-2 bg-green-500 text-white'>Absent</button>
        <button className='px-4 py-2 bg-green-500 text-white'>Sick</button>
        <button className='px-4 py-2 bg-green-500 text-white'>Leave</button>
    </div>    
        ):(
    <p className='bg-gray-100 w-20 text-center py-2 rounded'>{status}</p>
    )}
    </div>
  )
}

