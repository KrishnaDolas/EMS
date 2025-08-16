import React, { useEffect, useState } from "react";
import axios from "axios";

const AttendanceReport = () => {
  const [report, setReport] = useState([]);
  const [summary, setSummary] = useState({
    present: 0,
    absent: 0,
    sick: 0,
    leave: 0,
  });
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Fetch report
  const fetchReport = async () => {
  setLoading(true);
  try {
    let url = `${import.meta.env.VITE_API_URL}/api/attendance/report`;
    if (startDate && endDate) {
      url += `?startDate=${startDate}&endDate=${endDate}`;
    }

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.data.success) {
      const data = response.data.report.map((rec, index) => {
        const date = rec.date
          ? new Date(rec.date).toLocaleDateString("en-GB")
          : "N/A";

        return {
          srno: index + 1,
          employeeId: rec.employeeId || "N/A",
          name: rec.name || "N/A",
          department: rec.department?.dep_name || rec.department || "N/A",
          date,
          status: rec.status || "N/A",
        };
      });

      setReport(data);

      // Build summary counts
      const counts = { present: 0, absent: 0, sick: 0, leave: 0 };
      data.forEach((rec) => {
        const status = rec.status.toLowerCase();
        if (status === "present") counts.present++;
        if (status === "absent") counts.absent++;
        if (status === "sick") counts.sick++;
        if (status === "leave") counts.leave++;
      });
      setSummary(counts);
    }
  } catch (error) {
    console.error("Error fetching report:", error);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
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
          Attendance Report
        </h3>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
        />
        <button
          onClick={fetchReport}
          className="px-5 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition shadow"
        >
          Filter Report
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Present", value: summary.present, color: "bg-green-100 text-green-700" },
          { label: "Absent", value: summary.absent, color: "bg-red-100 text-red-700" },
          { label: "Sick", value: summary.sick, color: "bg-yellow-100 text-yellow-700" },
          { label: "Leave", value: summary.leave, color: "bg-blue-100 text-blue-700" },
        ].map((item, i) => (
          <div
            key={i}
            className={`p-4 rounded-lg shadow ${item.color}`}
          >
            <p className="text-sm font-medium">{item.label}</p>
            <h4 className="text-2xl font-bold">{item.value}</h4>
          </div>
        ))}
      </div>

      {/* Report Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        {loading ? (
          <p className="p-4 text-gray-500">Loading report...</p>
        ) : report.length === 0 ? (
          <p className="p-4 text-gray-500">No records found</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-4 py-3 border">Employee ID</th>
                <th className="px-4 py-3 border">Name</th>
                <th className="px-4 py-3 border">Department</th>
                <th className="px-4 py-3 border">Date</th>
                <th className="px-4 py-3 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {report.map((rec, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-2 border">{rec.employeeId}</td>
                  <td className="px-4 py-2 border">{rec.name}</td>
                  <td className="px-4 py-2 border">{rec.department}</td>
                  <td className="px-4 py-2 border">
                    {new Date(rec.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        rec.status === "Present"
                          ? "bg-green-100 text-green-700"
                          : rec.status === "Absent"
                          ? "bg-red-100 text-red-700"
                          : rec.status === "Sick"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {rec.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AttendanceReport;
