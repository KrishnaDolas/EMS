import React from 'react';
import { FaUser } from 'react-icons/fa'
import { useAuth } from '../Context/Authcontext';

const EmpSummaryCard = () => {
    const {user} = useAuth();
  return (
    <div className='p-6'>
    <div className='bg-white rounded-lg shadow-md p-4 flex items-center space-x-4'>
      <div className='text-3xl text-teal-500'>{FaUser}</div>
      <div>
        <p className='text-gray-600'>Welcome Back ! </p>
        <p className='text-xl font-semibold text-gray-800'>{user.name}</p>
      </div>
    </div>
    </div>
  );
};

export default EmpSummaryCard;