import React from 'react'
import SummaryCard from './SummaryCard'
import { FcConferenceCall, FcDepartment, FcMoneyTransfer , FcFile , FcApproval,FcProcess,FcDisapprove     } from "react-icons/fc";

const AdminSummary = () => {
  return (
    <div className='p-6'>
      <h3 className='text-2xl font-bold mb-4'>Dashboard Overview</h3>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
        <SummaryCard icon={<FcConferenceCall />} text='Total Employees' number={13} />
         <SummaryCard icon={<FcDepartment />} text='Total Departments' number={5} />
         <SummaryCard icon={<FcMoneyTransfer />} text='Monthly Salary' number='₹100000' />
      </div>

      <div className='mt-12'>
        <h3 className='text-2xl font-bold mb-4'>Leave Details</h3>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
        <SummaryCard icon={<FcFile  />} text='Leave Applied' number={15} />
         <SummaryCard icon={<FcApproval  />} text='Leave Approved' number={5} />
         <SummaryCard icon={<FcProcess  />} text='Leave Pending' number={7} />
         <SummaryCard icon={<FcDisapprove  />} text='Leave Rejected' number={3} />
      </div>
      </div>
    </div>
  );
};

export default AdminSummary;