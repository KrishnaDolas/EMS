import React, { useEffect } from 'react'
import { useAuth } from '../../Context/Authcontext'
import AdminSidebar from '../../Sidebars/AdminSidebar'
import Navbar from '../../Navbar/Navbar'
import AdminSummary from '../../Components/AdminSummary'
import { Outlet } from 'react-router-dom'

function Admindashboard() {
    const{user}= useAuth()

  return (
    <div className='flex'>
      <AdminSidebar/>
      <div className='flex-1 ml-64 bg-gray-100 h-screen'>
        <Navbar/>
        <Outlet/>
      </div>
      </div>
  )
}

export default Admindashboard