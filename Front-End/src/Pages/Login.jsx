import React, { useState } from 'react';
import axios from 'axios'
import { useAuth } from '../Context/Authcontext';
import { useNavigate } from 'react-router-dom';

function Login (){
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [error,setError]=useState(null)
  const {login}= useAuth()
  const navigate = useNavigate()
  //const apiUrl = 'https://bq6kmv94-8000.inc1.devtunnels.ms';

  const handleSubmit= async (e)=>{
    e.preventDefault()
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, { email, password });
      if (response.data.success) {
       login(response.data.user)
       localStorage.setItem("token",response.data.token)
       if(response.data.user.role === 'admin'){
        navigate('/admin-dashboard')
       }else{
        navigate('/employee-dashboard')
       }
      }
      
    } catch (error) {
      if(error.response && !error.response.data.success){
        setError(error.response.data.error)
      }else{
        setError("Server Error")
      }
      
    }
  }
  return (
    <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-600 from-50% to-gray-100 to-50% space-y-6">
      <h2 className='font-pacifico text-3xl text-white'>Employee Management System</h2>
      <form className="max-w-md w-full p-6 bg-white rounded shadow-md" onSubmit={handleSubmit}>
        {/* Email Address */}
        <div className="mb-4">
          <label
            htmlFor="exampleInputEmail1"
            className="block mb-1 text-gray-700 font-medium"
          >
            Email address
          </label>
          <input
            type="email"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e)=> setEmail(e.target.value)}
            required
          />
        </div>
        
        {/* Password */}
        <div className="mb-4">
          <label
            htmlFor="exampleInputPassword1"
            className="block mb-1 text-gray-700 font-medium"
          >
            Password
          </label>
          <input
            type="password"
            id="exampleInputPassword1"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e)=> setPassword(e.target.value)}
            required
          />
        </div>
        
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-teal-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Login
        </button>
        {error && <p className='text-red-500'>{error}</p>}
      </form>
    </div>
  );
}

export default Login;