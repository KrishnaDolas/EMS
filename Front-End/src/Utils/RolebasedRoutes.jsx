// RolebasedRoutes.jsx
import React from 'react'
import { useAuth } from '../Context/Authcontext'
import { Navigate } from 'react-router-dom'

const RolebasedRoutes = ({ children, requiredRole }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user || !requiredRole.includes(user.role)) {
    return <Navigate to='/unauthorized' />
  }

  return children
}

export default RolebasedRoutes