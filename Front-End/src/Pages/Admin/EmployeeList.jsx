import React from 'react'
import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom'

const EmployeeList = () => {
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

          {/* Table
          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-lg bg-white">
            <DataTable
              columns={columns}
              data={filteredDepartments}
              pagination
              customStyles={customStyles}
            />
          </div> */}
        </div>
    </div>
  )
}

export default EmployeeList