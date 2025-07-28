import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/Authcontext';
import { FcKey, FcLock, FcUnlock  } from 'react-icons/fc';

const EmpSetting = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [setting, setSetting] = useState({
    userId: user._id,
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);
  const apiUrl = 'https://bq6kmv94-8000.inc1.devtunnels.ms';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSetting({ ...setting, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (setting.newPassword !== setting.confirmPassword) {
      setError('Passwords do not match.');
    } else {
      try {
        const response = await axios.put(
          `${apiUrl}/api/setting/change-password`,
          setting,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        if (response.data.success) {
          navigate('/employee-dashboard');
          setError(null);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          setError(error.response.data.error);
        }
      }
    }
  };

  return (
    <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg w-full md:w-96'>
      <h2 className='text-3xl font-semibold text-center mb-6 text-gray-800'>Change Password</h2>
      {error && <p className='text-red-500 mb-4 text-center'>{error}</p>}
      <form onSubmit={handleSubmit} className='space-y-4'>
        {/* Old Password */}
        <div className='relative'>
          <label className='flex items-center mb-2 text-sm font-medium text-gray-700'>
            <FcUnlock  className='mr-2 w-5 h-5' />
            Old Password
          </label>
          <input
            type='password'
            name='oldPassword'
            placeholder='Old Password'
            onChange={handleChange}
            className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition'
            required
          />
        </div>

        {/* New Password */}
        <div className='relative'>
          <label className='flex items-center mb-2 text-sm font-medium text-gray-700'>
            <FcKey className='mr-2 w-5 h-5' />
            New Password
          </label>
          <input
            type='password'
            name='newPassword'
            placeholder='New Password'
            onChange={handleChange}
            className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition'
            required
          />
        </div>

        {/* Confirm Password */}
        <div className='relative'>
          <label className='flex items-center mb-2 text-sm font-medium text-gray-700'>
            <FcLock className='mr-2 w-5 h-5' />
            Confirm Password
          </label>
          <input
            type='password'
            name='confirmPassword'
            placeholder='Confirm Password'
            onChange={handleChange}
            className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition'
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-300 flex items-center justify-center'
        >
          <FcLock className='mr-2 w-5 h-5' />
          Change Password
        </button>
      </form>
    </div>
  );
};

export default EmpSetting;