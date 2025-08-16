import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { Attendancehelper } from "../../Utils/Attendancehelper";
import axios from "axios";

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredAttendance, setFilteredAttendance] = useState([]);

  const statusChange = () =>{
     fetchAttendance();
  }

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/attendance`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        const data = response.data.attendance.map((att, index) => {
          const dob = att.employeeId?.dob
            ? new Date(att.employeeId.dob).toLocaleDateString("en-GB")
            : "N/A";

          return {
            srno: index + 1,
            name: att.employeeId?.userId?.name || "N/A",
            employeeId: att.employeeId?.employeeId || "N/A",
            department: att.employeeId?.department?.dep_name || "N/A",
            dob,
            profileImage: att.employeeId?.userId?.profileImage || null,
            action: (
              <Attendancehelper
                status={att.status}
                id={att._id}
                onStatusChange={fetchAttendance}
                employeeId={att.employeeId?.employeeId}
                statusChange={statusChange}
              />
            ),
          };
        });

        setAttendance(data);
        setFilteredAttendance(data);
      }
    } catch (error) {
      console.error("Error fetching attendance:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleFilter = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const records = attendance.filter(
      (emp) =>
        emp.employeeId.toLowerCase().includes(searchValue) ||
        emp.name.toLowerCase().includes(searchValue) ||
        emp.department.toLowerCase().includes(searchValue)
    );
    setFilteredAttendance(records);
  };

  // ✅ Columns
  const columns = [
    {
      name: "Sr No",
      selector: (row) => row.srno,
      sortable: true,
      width: "80px",
    },
    {
      name: "Profile",
      cell: (row) => (
        <img
          src={
            row.profileImage ||
            `${import.meta.env.BASE_URL}default-avatar.png`
          }
          alt={row.name}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
          onError={(e) => {
            e.currentTarget.src = `${import.meta.env.BASE_URL}default-avatar.png`;
          }}
        />
      ),
      width: "90px",
    },
    {
      name: "Employee ID",
      selector: (row) => row.employeeId,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Department",
      selector: (row) => row.department,
      cell: (row) => (
        <span className="text-sm font-medium text-blue-600">
          {row.department}
        </span>
      ),
      sortable: true,
    },
    {
      name: "DOB",
      selector: (row) => row.dob,
      sortable: true,
    },
    {
  name: "Action",
  cell: (row) => row.action,
  ignoreRowClick: true,
  allowOverflow: true,
  button: true,
  width: "350px",  // <-- reserve space for buttons
}

  ];

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "#0f766e",
        color: "#ffffff",
        fontSize: "14px",
        fontWeight: "600",
        textTransform: "uppercase",
      },
    },
    rows: {
      style: {
        borderBottom: "1px solid #E5E7EB",
        "&:hover": { backgroundColor: "#f9fafb" },
      },
    },
    cells: {
      style: {
        textAlign: "center",
        justifyContent: "center",
      },
    },
    pagination: {
      style: {
        padding: "1rem",
        justifyContent: "flex-end",
      },
    },
  };

  return (
    <div>
      <div className="p-6 max-w-7xl mx-auto">
       {/* Header */}
<div className="mb-6 flex items-center gap-4">
  <div className="p-2 bg-teal-100 rounded-lg">
    <svg
      className="w-7 h-7 text-teal-600"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </div>
  <h3 className="text-3xl font-extrabold text-gray-800 tracking-tight">
    Manage Attendance
  </h3>
</div>

{/* Controls */}
<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 mb-8">
  {/* Search Input */}
  <div className="relative w-full sm:w-1/3">
    <input
      type="text"
      placeholder="Search by ID, name, or department..."
      onChange={handleFilter}
      className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
    />
    <svg
      className="absolute left-3 top-2/6 transform -translate-y-1/2 w-5 h-5 text-gray-400"
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
    <p className="mt-2 text-sm italic text-gray-500">
      Mark Employees for{" "}
      <span className="font-medium">
        {new Date().toISOString().split("T")[0]}
      </span>
    </p>
  </div>

  {/* Report Button */}
  <Link
    to="/admin-dashboard/attendance-report"
    className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-medium rounded-lg shadow hover:from-teal-700 hover:to-teal-800 transition"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 17v-6a2 2 0 012-2h6m2 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9a2 2 0 012-2h6"
      />
    </svg>
    Attendance Report
  </Link>
</div>


        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-lg bg-white max-w-[1800px] w-full mx-auto">
          <DataTable
            columns={columns}
            data={filteredAttendance}
            progressPending={loading}
            pagination
            highlightOnHover
            customStyles={customStyles}
          />
        </div>
      </div>
    </div>
  );
};

export default Attendance;
