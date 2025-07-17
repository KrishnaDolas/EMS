import React, { useEffect } from 'react'
import { useAuth } from '../../Context/Authcontext'
import { useNavigate } from 'react-router-dom'

function Admindashboard() {
    const{user,loading}= useAuth()
    const navigate = useNavigate()
    if(loading){
      return <div>Loading...</div>
    }
    if (!user){
      navigate('/login')
    }
  return (
    <div>Admindashboard {user && user.name}</div>
  )
}

export default Admindashboard