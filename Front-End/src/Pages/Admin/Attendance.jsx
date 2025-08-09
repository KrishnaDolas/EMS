import React from 'react'
import { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom'
import { Attendancehelper } from '../../Utils/Attendancehelper'
import { columns } from '../../Utils/Employeehelper'
import axios from 'axios'
import { FcBusinessman } from "react-icons/fc";

const Attendance = () => {
  const [attendance, setAttendance] = useState([])
  const [loading, setLoading] = useState(false)
  const [filteredAttendance, setFilteredAttendance] = useState([])

  const fetchAttendance = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/attendance`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      })
     if (response.data.success) {
    let srno = 1;
    const data = response.data.attendance.map((att) => ({
        srno: srno++,
        department: att.employeeId.department?.dep_name || "N/A",
        name: att.employeeId.userId?.name || "N/A",
        employeeId: att.employeeId?._id || "N/A",
        action: <Attendancehelper status={att.status} />
    }));

    setAttendance(data);
    setFilteredAttendance(data);
}

    } catch (error) {
    if (error.response && !error.response.data.success) {
        alert(error.response.data.message || "Something went wrong");
        console.error("Full error:", error.response.data);
    } else {
        console.error("Network or unknown error:", error);
    }

    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleFilter = (e) => {
    const records = attendance.filter((emp) =>
  emp.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
);
    setFilteredAttendance(records);
  };

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: '#0f766e',
        color: '#ffffff',
        fontSize: '14px',
        fontWeight: '600',
        textTransform: 'uppercase',
      },
    },
    headCells: {
      style: {
        paddingLeft: '1rem',
        paddingRight: '1rem',
        paddingTop: '0.75rem',
        paddingBottom: '0.75rem',
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
      },
    },
    rows: {
      style: {
        borderBottomWidth: '1px',
        borderColor: '#E5E7EB',
        '&:hover': {
          backgroundColor: '#f1f5f9',
        },
      },
    },
    cells: {
      style: {
        paddingLeft: '1rem',
        paddingRight: '1rem',
        paddingTop: '0.75rem',
        paddingBottom: '0.75rem',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
    pagination: {
      style: {
        padding: '1rem',
        justifyContent: 'flex-end',
      },
    },
  };

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
            Manage Attendance
          </h3>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <div className="relative w-full sm:w-1/3">
            <input
              type="text"
              placeholder="Search employees..."
              onChange={handleFilter}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
            />
            <p>
              Mark Employees for {new Date().toISOString().split('T')[0]}{''}
            </p>
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
            to="/admin-dashboard/attendance-report"
            className="inline-block px-5 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition duration-200 shadow"
          >
            Attendance Report
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-lg bg-white max-w-[1500px] mx-auto">
          <DataTable
            columns={columns}
            data={filteredAttendance}
            pagination
            customStyles={customStyles}
          />
        </div>
      </div>
    </div>
  );
};

export default Attendance;
