import React, { useEffect, useState } from 'react';
import { FaUser, FaEnvelope, FaIdBadge, FaCalendarAlt, FaVenusMars, FaRing, FaBriefcase, FaBuilding, FaDollarSign, FaLock, FaUserTie, FaImage, FaCheckCircle } from 'react-icons/fa';
import { fetchDepartments, getEmployees } from '../../Utils/Employeehelper';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const SuccessModal = ({ message, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
    <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-xl p-6 max-w-sm w-full shadow-lg border border-white border-opacity-20 animate-fadeIn">
      {/* Done Icon with bounce animation */}
      <div className="flex justify-center mb-4 animate-bounce">
        <FaCheckCircle className="text-4xl text-green-500" />
      </div>
      {/* Message */}
      <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">{message}</h2>
      {/* Okay Button */}
      <div className="flex justify-center">
        <button
          onClick={onClose}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Okay
        </button>
      </div>
    </div>
  </div>
);

const AddSalary = () => {
//   const { id } = useParams(); // Correctly destructure 'id' from URL
  const navigate = useNavigate();

  const [salary, setSalary] = useState({
    employeeId: null,
    basicSalary: 0,
    designation: 0,
    allowances: 0,
    deductions: 0,
    payDate :null
  });
  const [departments, setDepartments] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  
  //const apiUrl = 'https://bq6kmv94-8000.inc1.devtunnels.ms';

  // Fetch departments on component mount
  useEffect(() => {
    const getdepartments = async () => {
      const depts = await fetchDepartments();
      setDepartments(depts);
    };
    getdepartments();
  }, []);

  const handleDepartment = async (e) => {
    const emps = await getEmployees(e.target.value)
    setEmployees(emps)
  }

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalary((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/salary/add`, salary, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.data.success) {
        navigate('/admin-dashboard/employees')
        setShowSuccess(true);
      }
    } catch (error) {
      alert('Error updating employee.');
    }
  };

  return (
    <>
      {departments ? (
        <div className="max-w-5xl mx-auto mt-12 px-6 py-10 bg-gradient-to-r from-purple-50 via-white to-pink-50 rounded-xl shadow-lg relative">
          {/* Success modal overlay with glass effect */}
          {showSuccess && (
            <SuccessModal message="Employee updated successfully" onClose={handleCloseModal} />
          )}

          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Add Salary</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FaBuilding className="text-teal-500 mr-2" /> Department
                </label>
                <select
                  name="department"
                  onChange={handleDepartment}
                //   value={salary.department || ''}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                  required
                >
                  <option value="">Select Department</option>
                  {departments && departments.length > 0 ? (
                    departments.map(dep => (
                      <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                    ))
                  ) : (
                    <option disabled>No departments available</option>
                  )}
                </select>
              </div>
              {/* Employee */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FaBuilding className="text-teal-500 mr-2" /> Employee
                </label>
                <select
                  name="employeeId"
                  onChange={handleChange}
                //   value={employee.department || ''}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                  required
                >
                  <option value="">Select Employee</option>
                  {employees && departments.length > 0 ? (
                    employees.map(emp => (
                      <option key={emp._id} value={emp._id}>{emp.employeeId}</option>
                    ))
                  ) : (
                    <option disabled>No departments available</option>
                  )}
                </select>
              </div>

              {/* Basic Salary */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FaBriefcase className="text-teal-500 mr-2" /> Basic Salary
                </label>
                <input
                  type="number"
                  name="basicSalary"
                  onChange={handleChange}
                //   value={employee.designation || ''}
                  placeholder="Basic Salary"
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                  required
                />
              </div>

              {/* Allowances */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FaDollarSign className="text-teal-500 mr-2" /> Allowances
                </label>
                <input
                  type="number"
                  name="allowances"
                  onChange={handleChange}
                //   value={employee.salary || ''}
                  placeholder="Allowances"
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                  required
                />
              </div>
              {/* Deductions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FaDollarSign className="text-teal-500 mr-2" /> Deductions
                </label>
                <input
                  type="number"
                  name="deductions"
                  onChange={handleChange}
                //   value={employee.salary || ''}
                  placeholder="Deductions"
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                  required
                />
              </div>
              {/* Pay Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FaDollarSign className="text-teal-500 mr-2" /> Pay Date
                </label>
                <input
                  type="date"
                  name="payDate"
                  onChange={handleChange}
                //   value={employee.salary || ''}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                  required
                />
              </div>

              
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg"
            >
              Add Salary
            </button>
          </form>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default AddSalary;