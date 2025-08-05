import React, { useEffect, useState } from 'react'
import SummaryCard from './SummaryCard'
import { FcConferenceCall, FcDepartment, FcMoneyTransfer , FcFile , FcApproval,FcProcess,FcDisapprove     } from "react-icons/fc";
import axios from 'axios';

const AdminSummary = () => {
  const [summary,setSummary] = useState(null);
    //const apiUrl = 'https://bq6kmv94-8000.inc1.devtunnels.ms';

 useEffect(() => {
  const fetchSummary = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/dashboard/summary`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setSummary(response.data); // ✅ Correct: only the data!
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error);
      }
      console.log(error.message);
    }
  };
  fetchSummary();
}, []);

  if(!summary){
    return <div>Loading...</div>
  }

  return (
    <div className='p-6'>
      <h3 className='text-2xl font-bold mb-4'>Dashboard Overview</h3>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
        <SummaryCard icon={<FcConferenceCall />} text='Total Employees' number={summary.totalEmployee} />
         <SummaryCard icon={<FcDepartment />} text='Total Departments' number={summary.totalDepartments} />
         <SummaryCard icon={<FcMoneyTransfer />} text='Monthly Salary' number={summary.totalSalary} />
      </div>

      <div className='mt-12'>
        <h3 className='text-2xl font-bold mb-4'>Leave Details</h3>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
       <SummaryCard icon={<FcFile />} text='Leave Applied' number={summary.leaveSummary.appliedFor} />
<SummaryCard icon={<FcApproval />} text='Leave Approved' number={summary.leaveSummary.approved} />
<SummaryCard icon={<FcProcess />} text='Leave Pending' number={summary.leaveSummary.pending} />
<SummaryCard icon={<FcDisapprove />} text='Leave Rejected' number={summary.leaveSummary.rejected} />

      </div>
      </div>
    </div>
  );
};

export default AdminSummary;