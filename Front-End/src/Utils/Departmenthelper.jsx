import axios from "axios";
import { useNavigate } from "react-router-dom";


export const columns=[
    {
        name :'Sr No',
        selector:(row)=> row.srno
    },

    {
        name :'Department Name',
        selector:(row)=> row.dep_name,
        sortable:true
    },

    {
        name :'Action',
        selector:(row)=> row.action
    },
]

export const DepartmentButtons = ({_id,onDepartmentDelete}) => {
  const navigate = useNavigate()
  //const apiUrl = 'https://bq6kmv94-8000.inc1.devtunnels.ms';

  const handleDelete= async(id)=>{
    const confirm = window.confirm("Do you want to delete this entry ?")
     if(confirm){
     try {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/department/${id}`,{
              headers:{
                "Authorization": `Bearer ${localStorage.getItem('token')}`
              }
            })
            if(response.data.success){
             onDepartmentDelete()
            }
          } catch (error) {
            if(error.response && !error.response.data.success){
              alert(error.response.data.error)
            }
          }}
  }
  return (
    <div className="flex gap-2 space-x-3">
      <button className="px-3 py-1 bg-teal-600 text-white rounded hover:bg-blue-700 transition" onClick={()=>navigate(`/admin-dashboard/department/${_id}`)}>
        Edit
      </button>
      <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition" onClick={() => handleDelete(_id)}>
        Delete
      </button>
    </div>
  );
};
