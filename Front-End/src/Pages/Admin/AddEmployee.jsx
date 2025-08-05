import React, { useEffect, useState } from 'react';
import { FaUser, FaEnvelope, FaIdBadge, FaCalendarAlt, FaVenusMars, FaRing, FaBriefcase, FaBuilding, FaDollarSign, FaLock, FaUserTie, FaImage, FaCheckCircle } from 'react-icons/fa';
import { fetchDepartments } from '../../Utils/Employeehelper';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

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

const AddEmployee = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate()
  //const apiUrl = 'https://bq6kmv94-8000.inc1.devtunnels.ms';

  useEffect(() => {
    const getdepartments = async () => {
      const depts = await fetchDepartments();
      setDepartments(depts);
    };
    getdepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/employee/add`,
        formDataObj,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (response.data.success) {
        // Show success modal
        setShowSuccess(true);
        // Reset form data
        setFormData({});
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  const handleCloseModal = () => {
    setShowSuccess(false);
  };

  return (
    <div className="max-w-5xl mx-auto mt-12 px-6 py-10 bg-gradient-to-r from-purple-50 via-white to-pink-50 rounded-xl shadow-lg relative">
      {/* Success modal overlay with glass effect */}
      {showSuccess && (
        <SuccessModal
          message="User created"
          onClose={() => {
            handleCloseModal();
          }}
        />
      )}

      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Add New Employee</h2>
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
              value={formData.name || ''}
              placeholder="Input Name"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
              required
            />
          </div>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FaEnvelope className="text-teal-500 mr-2" /> Email
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email || ''}
              placeholder="Insert Email"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
              required
            />
          </div>
          {/* Employee ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FaIdBadge className="text-teal-500 mr-2" /> Employee ID
            </label>
            <input
              type="text"
              name="employeeId"
              onChange={handleChange}
              value={formData.employeeId || ''}
              placeholder="Employee ID"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
              required
            />
          </div>
          {/* Date Of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FaCalendarAlt className="text-teal-500 mr-2" /> Date Of Birth
            </label>
            <input
              type="date"
              name="dob"
              onChange={handleChange}
              value={formData.dob || ''}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
              required
            />
          </div>
          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FaVenusMars className="text-teal-500 mr-2" /> Gender
            </label>
            <select
              name="gender"
              onChange={handleChange}
              value={formData.gender || ''}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          {/* Marital Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FaRing className="text-teal-500 mr-2" /> Marital Status
            </label>
            <select
              name="maritalStatus"
              onChange={handleChange}
              value={formData.maritalStatus || ''}
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
              value={formData.designation || ''}
              placeholder="Designation"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
              required
            />
          </div>
          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FaBuilding className="text-teal-500 mr-2" /> Department
            </label>
            <select
              name="department"
              onChange={handleChange}
              value={formData.department || ''}
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
          {/* Salary */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FaDollarSign className="text-teal-500 mr-2" /> Salary
            </label>
            <input
              type="number"
              name="salary"
              onChange={handleChange}
              value={formData.salary || ''}
              placeholder="Salary"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
              required
            />
          </div>
          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FaLock className="text-teal-500 mr-2" /> Password
            </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="************"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
              required
            />
          </div>
          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FaUserTie className="text-teal-500 mr-2" /> Role
            </label>
            <select
              name="role"
              onChange={handleChange}
              value={formData.role || ''}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>
          {/* Upload Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FaImage className="text-teal-500 mr-2" /> Upload Image
            </label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              accept="image/*"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
            />
          </div>
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;