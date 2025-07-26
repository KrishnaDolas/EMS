import React from 'react'
import { useAuth } from '../Context/Authcontext'

const Navbar = () => {
  const { user,logout } = useAuth();

  return (
    <div className='flex items-center justify-between h-14 px-6 bg-teal-600 shadow-md sticky top-0 z-40'>
      <p className='text-lg font-semibold text-white'>Welcome, {user.name}</p>
      <button className='px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition duration-300 shadow-md' onClick={logout}>
        Logout
      </button>
    </div>
  )
}

export default Navbar