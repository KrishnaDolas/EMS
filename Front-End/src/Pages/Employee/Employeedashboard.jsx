import React from 'react'
import EmployeeSidebar from '../../Sidebars/EmployeeSidebar'
import Navbar from '../../Navbar/Navbar'
import { Outlet } from 'react-router-dom'


function Employeedashboard() {
  return (
    <div className='flex'>
      <EmployeeSidebar/>
      <div className='flex-1 ml-64 bg-gray-100 h-screen'>
        <Navbar/>
        <Outlet/>
      </div>
      </div>
  )
}

export default Employeedashboard