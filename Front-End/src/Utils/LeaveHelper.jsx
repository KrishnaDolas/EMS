import { FcBusinessman, FcCalendar, FcApproval, FcDepartment, FcOk,FcViewDetails  } from "react-icons/fc";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const columns = [
  {
    name: "Sr No",
    selector: (row) => row.srno,
    width: "80px",
  },
  {
    name: (
      <div className="flex items-center gap-1">
        <FcBusinessman /> Emp ID
      </div>
    ),
    selector: (row) => row.employeeId,
    width: "120px",
  },
  {
    name: (
      <div className="flex items-center gap-1">
        <FcBusinessman /> Name
      </div>
    ),
    selector: (row) => row.name,
    width: "180px",
  },
  {
    name: (
      <div className="flex items-center gap-1">
        <FcCalendar /> Leave Type
      </div>
    ),
    selector: (row) => row.leaveType,
    width: "140px",
  },
  {
    name: (
      <div className="flex items-center gap-1">
        <FcDepartment /> Department
      </div>
    ),
    selector: (row) => row.department,
    width: "170px",
    sortable: true,
  },
  {
    name: (
      <div className="flex items-center gap-1">
        <FcOk /> Days
      </div>
    ),
    selector: (row) => row.days,
    width: "80px",
    sortable: true,
  },
  {
    name: (
      <div className="flex items-center gap-1">
        <FcApproval /> Status
      </div>
    ),
    selector: (row) => row.status,
    width: "120px",
    sortable: true,
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];


export const LeaveButtons = ({ Id }) => {
  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/admin-dashboard/leaveList/leavedetails/${id}`);
  };

  return (
    <div className="flex gap-2">
      <button
        className="flex items-center gap-1 px-3 py-1 bg-teal-600 text-white rounded hover:bg-teal-700 transition"
        onClick={() => handleView(Id)}
      >
        <FcViewDetails className="w-4 h-4" /> View
      </button>
    </div>
  );
};
