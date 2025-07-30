import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { FaSearch, FaExclamationCircle, FaCheckCircle, FaTimesCircle, FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa';
import { LeaveButtons, columns } from '../../Utils/LeaveHelper';
import axios from 'axios';

const LeaveList = () => {
  const [leaves, setLeaves] = useState([]);
  const [displayLeaves, setDisplayLeaves] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

  const apiUrl = 'https://bq6kmv94-8000.inc1.devtunnels.ms';

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/leave`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.data.success) {
        let srno = 1;
        const data = response.data.leaves.map((leave) => {
          const start = new Date(leave.startDate);
          const end = new Date(leave.endDate);
          const diffTime = end - start;
          const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

          return {
            _id: leave._id,
            srno: srno++,
            employeeId: leave.employeeId ? leave.employeeId.employeeId : 'N/A',
            name: leave.employeeId ? leave.employeeId.userId?.name : 'Unknown',
            leaveType: leave.leaveType,
            department: leave.employeeId ? leave.employeeId.department?.dep_name : 'Unknown',
            days: diffDays,
            status: leave.status,
            action: <LeaveButtons Id={leave._id} />,
          };
        });
        setLeaves(data);
        setDisplayLeaves(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  // Function to filter and sort data
  const filterAndSortLeaves = (status) => {
    let filtered = [...leaves];
    if (status !== 'All') {
      filtered = filtered.filter((leave) => leave.status === status);
    }
    // sort by name with current direction
    filtered.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) return sortDirection === 'asc' ? -1 : 1;
      if (nameA > nameB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    setDisplayLeaves(filtered);
  };

  const handleFilterClick = (status) => {
    setFilterStatus(status);
    filterAndSortLeaves(status);
  };

  const toggleSortDirection = () => {
    const newDir = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newDir);
    filterAndSortLeaves(filterStatus);
  };

  // Handle search input
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = leaves.filter((leave) =>
      leave.employeeId.toString().includes(term) ||
      leave.name.toLowerCase().includes(term.toLowerCase())
    );
    // apply current status filter
    let finalFiltered = filtered;
    if (filterStatus !== 'All') {
      finalFiltered = filtered.filter(l => l.status === filterStatus);
    }
    // sort
    finalFiltered.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) return sortDirection === 'asc' ? -1 : 1;
      if (nameA > nameB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    setDisplayLeaves(finalFiltered);
  };

  // Handle approve/reject
  const handleAction = async (id, status) => {
    try {
      const res = await axios.put(`${apiUrl}/api/leave/${id}`, { status }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.data.success) {
        fetchLeaves();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto bg-gray-50 rounded-2xl shadow-lg">
      {/* Header */}
      <div className="flex items-center mb-8">
        <div className="bg-gradient-to-tr from-purple-400 via-pink-500 to-red-500 p-3 rounded-full shadow-lg animate-bounce">
          <FaExclamationCircle className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-4xl font-extrabold text-gray-800 ml-4">Manage Leaves</h3>
      </div>

      {/* Controls */}
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        {/* Search */}
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="🔍 Search leaves..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-12 pr-4 py-3 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          />
          <FaSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          {/* All */}
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
              filterStatus === 'All'
                ? 'bg-purple-600 text-white shadow-lg scale-105'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => handleFilterClick('All')}
          >
            <FaExclamationCircle className={`w-5 h-5 ${filterStatus==='All' ? 'text-white' : 'text-purple-600'}`} />
            All
          </button>
          {/* Pending */}
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
              filterStatus === 'Pending'
                ? 'bg-yellow-500 text-white shadow-lg scale-105'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => handleFilterClick('Pending')}
          >
            <FaSortAlphaDown className={`w-5 h-5 ${filterStatus==='Pending' ? 'text-white' : 'text-yellow-500'}`} />
            Pending
          </button>
          {/* Approved */}
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
              filterStatus === 'Approved'
                ? 'bg-green-600 text-white shadow-lg scale-105'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => handleFilterClick('Approved')}
          >
            <FaCheckCircle className={`w-5 h-5 ${filterStatus==='Approved' ? 'text-white' : 'text-green-600'}`} />
            Approved
          </button>
          {/* Rejected */}
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
              filterStatus === 'Rejected'
                ? 'bg-red-600 text-white shadow-lg scale-105'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => handleFilterClick('Rejected')}
          >
            <FaTimesCircle className={`w-5 h-5 ${filterStatus==='Rejected' ? 'text-white' : 'text-red-600'}`} />
            Rejected
          </button>
        </div>

        {/* Sort Button */}
        <button
          className="mt-4 md:mt-0 px-4 py-2 bg-purple-500 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transform transition"
          onClick={toggleSortDirection}
        >
          {sortDirection === 'asc' ? (
            <div className="flex items-center gap-2">
              <FaSortAlphaDown className="w-5 h-5" /> Name A-Z
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <FaSortAlphaUp className="w-5 h-5" /> Name Z-A
            </div>
          )}
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-lg bg-white border border-gray-200">
        <DataTable
          columns={columns}
          data={displayLeaves}
          pagination
          highlightOnHover
          responsive
          customStyles={{
            headCells: {
              style: { backgroundColor: '#f9fafb', fontWeight: 'bold' },
            },
            rows: {
              style: { transition: 'background-color 0.2s' },
              highlightOnHoverStyle: {
                backgroundColor: '#eff6ff',
                borderBottomColor: '#aacbff',
                outline: '1px solid #339af0',
              },
            },
          }}
        />
      </div>

      {displayLeaves.length === 0 && (
        <div className="mt-8 text-center text-gray-500 text-lg font-semibold">
          No leaves found.
        </div>
      )}
    </div>
  );
};

export default LeaveList;