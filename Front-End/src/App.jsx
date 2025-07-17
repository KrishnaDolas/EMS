import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import Admindashboard from './Pages/Admin/Admindashboard';
import Employeedashboard from './Pages/Employee/Employeedashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin-dashboard" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin-dashboard" element={<Admindashboard />} />
      <Route path="/employee-dashboard" element={<Employeedashboard />} />
    </Routes>
  );
}

export default App;