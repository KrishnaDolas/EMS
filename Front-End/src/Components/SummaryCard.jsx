import React from 'react';

const SummaryCard = ({ icon, text, number }) => {
  return (
    <div className='bg-white rounded-lg shadow-md p-4 flex items-center space-x-4'>
      <div className='text-3xl text-teal-500'>{icon}</div>
      <div>
        <p className='text-gray-600'>{text}</p>
        <p className='text-xl font-semibold text-gray-800'>{number}</p>
      </div>
    </div>
  );
};

export default SummaryCard;