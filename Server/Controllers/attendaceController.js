// controllers/attendanceController.js
import { Attendance } from "../Modules/Attendance.js";
import Employee from "../Modules/Employee.js";

// Helper: get today's date string in IST (YYYY-MM-DD)
const todayIST = () =>
  new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });

const getAttendance = async (req, res) => {
  try {
    const today = todayIST();

    // 1) Fetch all employees (we'll upsert attendance rows for each)
    const employees = await Employee.find({})
      .populate('department')
      .populate('userId');

    // 2) Upsert one attendance document per employee for today
    //    (status starts as null; you can change to "Absent" if you prefer)
    if (employees.length) {
      const ops = employees.map(emp => ({
        updateOne: {
          filter: { employeeId: emp._id, date: today },
          update: {
            $setOnInsert: {
              employeeId: emp._id,
              date: today,
              status: null
            }
          },
          upsert: true
        }
      }));

      // Ignore duplicate conflicts if multiple requests race
      await Attendance.bulkWrite(ops, { ordered: false });
    }

    // 3) Read back today's attendance, fully populated
    const attendance = await Attendance.find({ date: today })
      .populate({
        path: 'employeeId',
        populate: [
          { path: 'department' },
          { path: 'userId' }
        ]
      })
      .sort({ 'employeeId.employeeId': 1 });

    res.status(200).json({ success: true, attendance });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error?.message || "Unknown server error",
      stack: error?.stack || null,
      error: JSON.parse(JSON.stringify(error))
    });
  }
};

export const updateAttendance = async (req, res) => {
  try {
    const { employeeId } = req.params;       // e.g. "KS1001"
    const { status } = req.body;             // "Present" | "Absent" | "Sick" | "Leave"
    const today = todayIST();

    // Find employee by business employeeId
    const employee = await Employee.findOne({ employeeId });
    if (!employee) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    // Upsert today's attendance for that employee
    const attendance = await Attendance.findOneAndUpdate(
      { employeeId: employee._id, date: today },
      { $set: { status } },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true
      }
    ).populate({
      path: 'employeeId',
      populate: [
        { path: 'department' },
        { path: 'userId' }
      ]
    });

    res.status(200).json({ success: true, attendance });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAttendanceReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const filter = {};

    if (startDate && endDate) {
      filter.date = { $gte: startDate, $lte: endDate };
    }

    const attendanceRecords = await Attendance.find(filter)
      .populate({
        path: "employeeId",
        select: "employeeId department userId",
        populate: [
          { path: "department", select: "dep_name" },
          { path: "userId", select: "name" }
        ]
      })
      .sort({ date: -1 });

    const report = attendanceRecords.map((record) => ({
      date: record.date,
      employeeId: record.employeeId?.employeeId || "N/A",
      employeeName: record.employeeId?.userId?.name || "N/A",
      departmentName: record.employeeId?.department?.dep_name || "N/A",
      status: record.status ?? "N/A",
    }));

    res.status(200).json({
      success: true,
      count: report.length,
      report,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: Could not fetch report",
    });
  }
};

export default getAttendance;
