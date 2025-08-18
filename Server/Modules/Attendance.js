// Modules/Attendance.js
import mongoose from 'mongoose';

const AttendanceSchema = new mongoose.Schema({
  date: {
    type: String, // format YYYY-MM-DD
    required: true
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  status: {
    type: String,
    enum: ['Present', 'Absent', 'Sick', 'Leave'],
    default: null
  }
}, { timestamps: true });

// Ensure one row per employee per day
AttendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });

export const Attendance = mongoose.model('Attendance', AttendanceSchema);
