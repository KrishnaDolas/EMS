import React from "react";
import axios from "axios";

export const Attendancehelper = ({ status, id, onStatusChange,employeeId,statusChange }) => {
  const markAttendance = async (status,employeeId) => {
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/attendance/update/${employeeId}`,{status},{
      headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
    })
    if(response.data.success){
      statusChange();
    }
  };

  return (
    <div>
      {status == null ? (
        <div className="flex flex-row gap-2">
          <button
            onClick={() => markAttendance("Present",employeeId)}
            className="w-20 h-8 bg-green-500 text-white text-sm rounded-md shadow hover:bg-green-600 transition"
          >
            Present
          </button>
          <button
            onClick={() => markAttendance("Absent",employeeId)}
            className="w-20 h-8 bg-red-500 text-white text-sm rounded-md shadow hover:bg-red-600 transition"
          >
            Absent
          </button>
          <button
            onClick={() => markAttendance("Sick",employeeId)}
            className="w-20 h-8 bg-yellow-500 text-white text-sm rounded-md shadow hover:bg-yellow-600 transition"
          >
            Sick
          </button>
          <button
            onClick={() => markAttendance("Leave",employeeId)}
            className="w-20 h-8 bg-blue-500 text-white text-sm rounded-md shadow hover:bg-blue-600 transition"
          >
            Leave
          </button>
        </div>
      ) : (
        <p className="bg-gray-200 w-24 text-center py-1 text-sm rounded-md font-medium text-gray-700 shadow">
          {status}
        </p>
      )}
    </div>
  );
};
