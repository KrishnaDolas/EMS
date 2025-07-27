import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom'
import { EmployeeButtons, columns } from '../../Utils/Employeehelper'
import axios from 'axios'
import { FcBusinessman, FcCalendar } from "react-icons/fc";
import { useAuth } from '../../Context/Authcontext'

const LeaveList = () => {
    const { user } = useAuth();
    const [leaves, setLeaves] = useState([]);
    const [filteredEmployee, setFilteredEmployee] = useState([]);
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
                // Remove setFilteredSalaries if not needed
            } else {
                alert('Failed to fetch leaves');
            }
        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, [user._id]); // Add dependency if user can change

    const handleFilter = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        const filtered = leaves.filter((leave) =>
            leave.leaveType.toLowerCase().includes(value) ||
            leave.reason.toLowerCase().includes(value)
            // Add other fields if needed
        );
        setFilteredEmployee(filtered);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        return `${day}/${month}/${year}`;
    }

    const displayedLeaves = searchTerm ? filteredEmployee : leaves;

    return (
        <div>
            <div className="p-6 max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 flex items-center gap-3">
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
                    <h3 className="text-3xl font-bold text-gray-800">
                        Manage Leaves
                    </h3>
                </div>

                {/* Controls */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                    <div className="relative w-full sm:w-1/3">
                        <input
                            type="text"
                            placeholder="Search leaves..."
                            value={searchTerm}
                            onChange={handleFilter}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
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
                <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-blue-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">SR No</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                    <FcBusinessman className="inline-block mr-1" /> Leave Type
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">From</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">To</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Discription</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Applied Date</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                    <FcCalendar className="inline-block mr-1" /> Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {displayedLeaves.map((leave, index) => (
                                <tr key={leave._id} className="hover:bg-blue-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-700">{leave.leaveType}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{formatDate(leave.startDate)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{formatDate(leave.endDate)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap font-bold text-green-600">{leave.reason}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{formatDate(leave.appliedAt)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{leave.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default LeaveList;