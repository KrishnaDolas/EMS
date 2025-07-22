import axios from "axios"
const apiUrl = 'https://bq6kmv94-8000.inc1.devtunnels.ms';

 export const fetchDepartments = async()=>{
    let departments
      try {
        const response = await axios.get(`${apiUrl}/api/department`,{
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