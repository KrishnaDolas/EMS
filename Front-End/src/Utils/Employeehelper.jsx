import axios from "axios"
import { Navigate, useNavigate } from "react-router-dom";
//const apiUrl = 'https://bq6kmv94-8000.inc1.devtunnels.ms';


export const columns=[
    {
        name :'Sr No',
        selector:(row)=> row.srno,
        width:'80px'
    },

    {
        name :'Name',
        selector:(row)=> row.name,
        sortable:true,
        width:'200px'
    },

    {
        name :'Image',
        selector:(row)=> row.profileImage,
        width:'150px',
    },

    {
        name :'Department',
        selector:(row)=> row.dep_name,
         width:'150px'
    },

    {
        name :'DOB',
        selector:(row)=> row.dob,
        sortable:true,
         width:'150px'
    },

    {
        name :'Action',
        selector:(row)=> row.action
    },
]

 export const fetchDepartments = async()=>{
    let departments
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/department`,{
          headers:{
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success){
         departments = response.data.departments
        }
      } catch (error) {
        if(error.response && !error.response.data.success){
          alert(error.response.data.error)
        }
      }
      return departments
    }
    
    // employees for salary form 
 export const getEmployees = async(id)=>{
    let employees
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/employee/department/${id}`,{
          headers:{
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success){
         employees = response.data.employees
        }
      } catch (error) {
        if(error.response && !error.response.data.success){
          alert(error.response.data.error)
        }
      }
      return employees
    }


    export const EmployeeButtons = ({Id}) => {
      const navigate = useNavigate();
      //const apiUrl = 'https://bq6kmv94-8000.inc1.devtunnels.ms';  
      
    
      return (
        <div className="flex gap-2 space-x-3">
          <button className="px-3 py-1 bg-teal-600 text-white rounded hover:bg-blue-700 transition" onClick={()=>navigate(`/admin-dashboard/employees/${Id}`)}>
            View
          </button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-red-700 transition" onClick={()=>navigate(`/admin-dashboard/employees/edit/${Id}`)}>
            Edit
          </button>

           <button className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-red-700 transition" onClick={()=>navigate(`/admin-dashboard/employees/salary/${Id}`)}>
            Salary
          </button>

           <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition" onClick={()=> navigate(`/admin-dashboard/employees/leaves/${Id}`)}>
            Leave
          </button>
        </div>
      );
    };