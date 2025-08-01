import React from 'react'
import {Link} from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { columns, DepartmentButtons } from '../../Utils/Departmenthelper'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';

const DepartmentList = () => {
  const apiUrl = 'https://bq6kmv94-8000.inc1.devtunnels.ms';
  const [departments,setDepartments]=useState([])
  const[depLoading,setDepLoading]=useState(false)
  const [filteredDepartments,setFilteredDepartments]= useState([])

  const onDepartmentDelete = ()=>{
    fetchDepartments();
  }

  const filterDepartments = (e)=>{
    const records = departments.filter((dep)=>dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilteredDepartments(records)
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
      },
    },
    pagination: {
      style: {
        padding: '1rem',
        justifyContent: 'flex-end',
      },
    },
  };

  const fetchDepartments = async()=>{
    setDepLoading(true)
    try {
      const response = await axios.get(`${apiUrl}/api/department`,{
        headers:{
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(response.data.success){
        let srno=1;
        const data= await response.data.departments.map((dep)=>(
          {
            _id:dep._id,
            srno: srno++,
            dep_name:dep.dep_name,
            action:(<DepartmentButtons _id={dep._id} onDepartmentDelete={onDepartmentDelete}/>)
          }
        ))
        setDepartments(data)
        setFilteredDepartments(data)
      }
    } catch (error) {
      if(error.response && !error.response.data.success){
        alert(error.response.data.error)
      }
    }
    finally{
      setDepLoading(false)
    }
  }
  useEffect(()=>{
    fetchDepartments();
  },[])

  return (
    <>
      {depLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="text-lg font-semibold">Loading...</div>
        </div>
      ) : (
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
              Manage Departments
            </h3>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <div className="relative w-full sm:w-1/3">
              <input
                type="text"
                placeholder="Search departments..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
                onChange={filterDepartments}
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
              to="/admin-dashboard/add-department"
              className="inline-block px-5 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition duration-200 shadow"
            >
              + Add Department
            </Link>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-lg bg-white">
            <DataTable
              columns={columns}
              data={filteredDepartments}
              pagination
              customStyles={customStyles}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default DepartmentList