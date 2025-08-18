import Department from "../Modules/Department.js";
import Employee from "../Modules/Employee.js";
import Leave from "../Modules/Leave.js";
import { Attendance } from "../Modules/Attendance.js";

// Helper: today's date string in IST
const todayIST = () =>
  new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });

const getSummary = async (req, res) => {
  try {
    const totalEmployee = await Employee.countDocuments();
    const totalDepartments = await Department.countDocuments();

    const totalSalary = await Employee.aggregate([
      { $group: { _id: null, totalSalary: { $sum: "$salary" } } },
    ]);

    // Leave summary
    const employeeAppliedForLeave = await Leave.distinct("employeeId");
    const leaveStatus = await Leave.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const leaveSummary = {
      appliedFor: employeeAppliedForLeave.length,
      approved: leaveStatus.find((item) => item._id === "Approved")?.count || 0,
      rejected: leaveStatus.find((item) => item._id === "Rejected")?.count || 0,
      pending: leaveStatus.find((item) => item._id === "Pending")?.count || 0,
    };

    // Attendance summary (today only)
    const today = todayIST();
    const attendanceStatus = await Attendance.aggregate([
      { $match: { date: today } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const attendanceSummary = {
      present: attendanceStatus.find((s) => s._id === "Present")?.count || 0,
      absent: attendanceStatus.find((s) => s._id === "Absent")?.count || 0,
      sick: attendanceStatus.find((s) => s._id === "Sick")?.count || 0,
      leave: attendanceStatus.find((s) => s._id === "Leave")?.count || 0,
    };

    return res.status(200).json({
      success: true,
      totalEmployee,
      totalDepartments,
      totalSalary: totalSalary[0]?.totalSalary || 0,
      leaveSummary,
      attendanceSummary, // 👈 now included
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Dashboard Summary Error" });
  }
};

export { getSummary };
