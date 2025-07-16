import React, { useEffect } from 'react'
import { useAuth } from '../../Context/Authcontext'

function Admindashboard() {
    const{user}= useAuth()
  return (
    <div>Admindashboard {user && user.name}</div>
  )
}

export default Admindashboard