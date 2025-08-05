import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddDepartment = () => {
  // //const apiUrl = 'https://bq6kmv94-8000.inc1.devtunnels.ms';

  const [department, setDepartment] = useState({
    dep_name: '',
    description: '',
  });

  const navigate = useNavigate();

  const handlechange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/department/add`,
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (response.data.success) {
        navigate('/admin-dashboard/departments');
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800">
          Add Department
        </h3>
        <form className="space-y-5" onSubmit={handlesubmit}>
          <div>
            <label
              htmlFor="dep_name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Department Name
            </label>
            <input
              type="text"
              id="dep_name"
              name="dep_name"
              value={department.dep_name}
              onChange={handlechange}
              placeholder="Enter Department Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description" 
              value={department.description}
              onChange={handlechange}
              placeholder="Description"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Department
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;
