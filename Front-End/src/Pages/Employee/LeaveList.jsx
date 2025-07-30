import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FcBusinessman, FcCalendar } from 'react-icons/fc';
import { useAuth } from '../../Context/Authcontext';

const LeaveList = () => {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const apiUrl = 'https://bq6kmv94-8000.inc1.devtunnels.ms';

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/leave/${user._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.data.success) {
        setLeaves(response.data.leaves);
      } else {
        alert('Failed to fetch leaves');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchLeaves();
    }
  }, [user?._id]);

  const handleFilter = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = leaves.filter(
      (leave) =>
        leave.leaveType.toLowerCase().includes(value) ||
        leave.reason.toLowerCase().includes(value)
    );
    setFilteredLeaves(filtered);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // DD/MM/YYYY
  };

  const displayedLeaves = searchTerm ? filteredLeaves : leaves;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <div className="flex items-center justify-center bg-teal-100 rounded-full p-2">
          <svg
            className="w-8 h-8 text-teal-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>
        <h3 className="text-3xl font-bold text-gray-800">Your Leaves</h3>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div className="relative w-full sm:w-1/3">
          <input
            type="text"
            placeholder="Search leaves..."
            value={searchTerm}
            onChange={handleFilter}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
            />
          </svg>
        </div>

        <Link
          to="/employee-dashboard/AddLeave"
          className="inline-block px-5 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition duration-200 shadow"
        >
          + Add New Leave
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">SR No</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                <FcBusinessman className="inline-block mr-1" /> Leave Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">From</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">To</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Reason</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Applied Date</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                <FcCalendar className="inline-block mr-1" /> Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {displayedLeaves.length > 0 ? (
              displayedLeaves.map((leave, index) => (
                <tr key={leave._id} className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 font-medium text-gray-700">{leave.leaveType}</td>
                  <td className="px-6 py-4">{formatDate(leave.startDate)}</td>
                  <td className="px-6 py-4">{formatDate(leave.endDate)}</td>
                  <td className="px-6 py-4 text-green-600 font-bold">{leave.reason}</td>
                  <td className="px-6 py-4">{formatDate(leave.appliedAt)}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        leave.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : leave.status === 'Approved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {leave.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                  No leaves found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveList;
