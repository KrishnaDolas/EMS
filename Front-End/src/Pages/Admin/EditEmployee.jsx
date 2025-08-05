import React, { useEffect, useState } from 'react';
import { FaUser, FaEnvelope, FaIdBadge, FaCalendarAlt, FaVenusMars, FaRing, FaBriefcase, FaBuilding, FaDollarSign, FaLock, FaUserTie, FaImage, FaCheckCircle } from 'react-icons/fa';
import { fetchDepartments } from '../../Utils/Employeehelper';
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

const EditEmployee = () => {
  const { id } = useParams(); // Correctly destructure 'id' from URL
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    name: '',
    maritalStatus: '',
    designation: '',
    salary: 0,
    department: ''
  });
  const [departments, setDepartments] = useState(null);
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

  // Fetch employee data based on 'id' param
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (res.data.success) {
          setEmployee(res.data.employee);
          // Initialize formData with employee data
          setEmployee({
            name: res.data.employee.userId.name,
            maritalStatus: res.data.employee.maritalStatus,
            designation: res.data.employee.designation,
            salary: res.data.employee.salary,
            department: res.data.employee.department,
            // add more fields if needed
          });
        } else {
          alert('Failed to fetch employee.');
        }
      } catch (err) {
        console.error(err);
        alert('Error fetching employee.');
      }
    };
    if (id) fetchEmployee();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/employee/${id}`, employee, {
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
      {departments && employee ? (
        <div className="max-w-5xl mx-auto mt-12 px-6 py-10 bg-gradient-to-r from-purple-50 via-white to-pink-50 rounded-xl shadow-lg relative">
          {/* Success modal overlay with glass effect */}
          {showSuccess && (
            <SuccessModal message="Employee updated successfully" onClose={handleCloseModal} />
          )}

          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Edit Employee</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FaUser className="text-teal-500 mr-2" /> Name
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={employee.name || ''}
                  placeholder="Input Name"
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                  required
                />
              </div>

              {/* Marital Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FaRing className="text-teal-500 mr-2" /> Marital Status
                </label>
                <select
                  name="maritalStatus"
                  onChange={handleChange}
                  value={employee.maritalStatus || ''}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                </select>
              </div>

              {/* Designation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FaBriefcase className="text-teal-500 mr-2" /> Designation
                </label>
                <input
                  type="text"
                  name="designation"
                  onChange={handleChange}
                  value={employee.designation || ''}
                  placeholder="Designation"
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                  required
                />
              </div>

              {/* Salary */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FaDollarSign className="text-teal-500 mr-2" /> Salary
                </label>
                <input
                  type="number"
                  name="salary"
                  onChange={handleChange}
                  value={employee.salary || ''}
                  placeholder="Salary"
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                  required
                />
              </div>

              {/* Department */}
              <div className='col-span-2'>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FaBuilding className="text-teal-500 mr-2" /> Department
                </label>
                <select
                  name="department"
                  onChange={handleChange}
                  value={employee.department || ''}
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
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg"
            >
              Save Changes
            </button>
          </form>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default EditEmployee;