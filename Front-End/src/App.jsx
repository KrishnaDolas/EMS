// App.jsx
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './Pages/Login'
import Admindashboard from './Pages/Admin/Admindashboard'
import Employeedashboard from './Pages/Employee/Employeedashboard'
import PrivateRoutes from './Utils/PrivateRoutes'
import RolebasedRoutes from './Utils/RolebasedRoutes'
import AdminSummary from './Components/AdminSummary'
import DepartmentList from './Pages/Admin/DepartmentList'
import AddDepartment from './Pages/Admin/AddDepartment'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin-dashboard" />} />
      <Route path="/login" element={<Login />} />


                                          {/* Admin Routes */}
      <Route
        path="/admin-dashboard"
        element={
          <PrivateRoutes>
            <RolebasedRoutes requiredRole={['admin']}>
              <Admindashboard />
            </RolebasedRoutes>
          </PrivateRoutes>
        }
      >

      <Route index element={<AdminSummary/>}></Route>
      <Route path='/admin-dashboard/departments' element={<DepartmentList/>}></Route>
      <Route path='/admin-dashboard/add-department' element={<AddDepartment/>}></Route>
      </Route>

                                        {/* Employee Routes  */}

      <Route
        path="/employee-dashboard"
        element={
          <PrivateRoutes>
            <RolebasedRoutes requiredRole={['employee', 'admin']}>
              <Employeedashboard />
            </RolebasedRoutes>
          </PrivateRoutes>
        }
      />
    </Routes>
  )
}

export default App