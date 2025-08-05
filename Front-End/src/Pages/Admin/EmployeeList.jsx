import React from 'react'
import { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom'
import { EmployeeButtons } from '../../Utils/Employeehelper'
import { columns } from '../../Utils/Employeehelper'
import axios from 'axios'
import { FcBusinessman } from "react-icons/fc";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([])
  const [empLoading, setEmpLoading] = useState(false)
  const [filteredEmployee, setFilteredEmployee]=useState([])
  //const apiUrl = 'https://bq6kmv94-8000.inc1.devtunnels.ms';

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true)
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/employee`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (response.data.success) {
          let srno = 1;
          const data = await response.data.employees.map((emp) => ({
            _id: emp._id,
            srno: srno++,
            dep_name: emp.department.dep_name,
            name: emp.userId.name,
            dob: new Date(emp.dob).toLocaleDateString(),
            profileImage: emp.userId.profileImage ? (
              <img
                width={70}
                height={70}
                className="rounded-full object-cover border border-gray-300 shadow"
                src={`http://localhost:8000/${emp.userId.profileImage}`}
                alt="Profile"
              />
            ) : (
              <div className="w-[70px] h-[70px] flex items-center justify-center rounded-full bg-gray-100 border border-gray-300 shadow">
                <FcBusinessman className="w-10 h-10" />
              </div>
            ),
            action: <EmployeeButtons Id={emp._id} />,
          }));

          setEmployees(data);
          setFilteredEmployee(data)
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error)
        }
      }
      finally {
        setEmpLoading(false)
      }
    }
    fetchEmployees();
  }, [])

  const handleFilter = (e) =>{
    const  records = employees.filter((emp) =>(
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    ))
    setFilteredEmployee(records)
  }

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
        textAlign: 'center', // make header text centered
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
        textAlign: 'center', // center align cell data
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
            Manage Employee
          </h3>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <div className="relative w-full sm:w-1/3">
            <input
              type="text"
              placeholder="Search departments..."
              onChange={handleFilter}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
            // onChange={filterDepartments}
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
            to="/admin-dashboard/add-employee"
            className="inline-block px-5 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition duration-200 shadow"
          >
            + Add New Employee
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-lg bg-white max-w-[1500px] mx-auto">
          <DataTable
            columns={columns}
            data={filteredEmployee}
            pagination
            customStyles={customStyles}
          />
        </div>
      </div>
    </div>
  )
}

export default EmployeeList