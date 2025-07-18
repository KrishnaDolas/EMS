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

  useEffect(()=>{
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
              action:(<DepartmentButtons/>)
            }
          ))
          setDepartments(data)
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
    fetchDepartments();
  },[])

  return (
    <>{depLoading ? <div>Loading...</div>:
    <div className='p-5'>
      <div className='text-center'>
        <h3 className='text-2xl font-bold'>Manage Departments</h3>
      </div>
      <div className='flex justify-between items-center'>
        <input type="text" placeholder='Search By Department Name' className='px-4 py-0.5 border' />
        <Link to='/admin-dashboard/add-department'className='px-4 py-1 bg-teal-600 rounded text-white'>Add New Department</Link>
      </div>
      <div>
        <DataTable
        columns={columns} data={departments}
        />
      </div>
    </div>
    }</>
  )
}

export default DepartmentList