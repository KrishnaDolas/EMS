import React from 'react'
import { NavLink } from 'react-router-dom'
import { FcHome, FcConferenceCall, FcDepartment, FcPlanner, FcMoneyTransfer, FcServices } from "react-icons/fc";

const AdminSidebar = () => {
  const navItems = [
    { to: '/admin-dashboard', icon: <FcHome className='w-5 h-5' />, label: 'Dashboard' },
    { to: '/employees', icon: <FcConferenceCall className='w-5 h-5' />, label: 'Employees' },
    { to: '/departments', icon: <FcDepartment className='w-5 h-5' />, label: 'Departments' },
    { to: '/leaves', icon: <FcPlanner className='w-5 h-5' />, label: 'Leaves' },
    { to: '/salary', icon: <FcMoneyTransfer className='w-5 h-5' />, label: 'Salary' },
    { to: '/settings', icon: <FcServices className='w-5 h-5' />, label: 'Setting' },
  ];

  return (
    <div className='bg-gray-800 text-white h-screen fixed left-0 top-0 w-64 shadow-xl z-50'>
      {/* Header */}
      <div className='bg-teal-600 h-24 flex items-center justify-center px-4 rounded-b-lg shadow-md'>
        <h3 className='text-2xl font-pacifico font-semibold text-center text-white'>Employee Management System</h3>
      </div>

      {/* Navigation Items */}
      <div className='mt-6 px-2'>
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 mb-2 rounded-lg transition-all duration-300 ${
                isActive
                  ? 'bg-teal-500 shadow-lg scale-105 font-semibold'
                  : 'hover:bg-gray-700 hover:scale-105'
              }`
            }
          >
            <div className='mr-3'>{item.icon}</div>
            <span className='text-medium'>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default AdminSidebar