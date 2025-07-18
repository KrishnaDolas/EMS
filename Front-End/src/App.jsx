// App.jsx
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './Pages/Login'
import Admindashboard from './Pages/Admin/Admindashboard'
import Employeedashboard from './Pages/Employee/Employeedashboard'
import PrivateRoutes from './Utils/PrivateRoutes'
import RolebasedRoutes from './Utils/RolebasedRoutes'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin-dashboard" />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/admin-dashboard"
        element={
          <PrivateRoutes>
            <RolebasedRoutes requiredRole={['admin']}>
              <Admindashboard />
            </RolebasedRoutes>
          </PrivateRoutes>
        }
      />

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