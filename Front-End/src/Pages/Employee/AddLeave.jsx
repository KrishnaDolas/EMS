import React, { useState } from 'react';
import { FcCalendar, FcApproval, FcEditImage, FcDocument } from "react-icons/fc";
import { useAuth } from '../../Context/Authcontext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // ← Don’t forget this if not imported

const AddLeave = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    //const apiUrl = 'https://bq6kmv94-8000.inc1.devtunnels.ms';

    const [leave, setLeave] = useState({
        userId: user._id,
        leaveType: '',
        startDate: '',
        endDate: '',
        reason: ''
    });

    // Get today’s date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLeave((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/leave/add`, leave, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (res.data.success) {
                navigate('/employee-dashboard/Leaves');
            } else {
                alert('Failed to add leave.');
            }
        } catch (err) {
            console.error(err);
            alert('Error submitting leave request.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-12 bg-white p-10 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
                <FcCalendar className="w-8 h-8" />
                <h2 className="text-3xl font-bold text-gray-800">Request For Leave</h2>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Leave Type */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <FcApproval className="w-5 h-5" />
                        Leave Type
                    </label>
                    <select
                        name="leaveType"
                        value={leave.leaveType}
                        onChange={handleChange}
                        className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        required
                    >
                        <option value="">Select Leave Type</option>
                        <option value="Sick Leave">Sick Leave</option>
                        <option value="Casual Leave">Casual Leave</option>
                        <option value="Annual Leave">Annual Leave</option>
                    </select>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                            <FcCalendar className="w-5 h-5" />
                            From Date
                        </label>
                        <input
                            type="date"
                            name="startDate"
                            value={leave.startDate}
                            onChange={handleChange}
                            max={leave.leaveType === 'Sick Leave' ? today : undefined}
                            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                            <FcCalendar className="w-5 h-5" />
                            To Date
                        </label>
                        <input
                            type="date"
                            name="endDate"
                            value={leave.endDate}
                            onChange={handleChange}
                            max={leave.leaveType === 'Sick Leave' ? today : undefined}
                            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <FcDocument className="w-5 h-5" />
                        Description
                    </label>
                    <textarea
                        name="reason"
                        value={leave.reason}
                        placeholder="Enter reason for leave..."
                        onChange={handleChange}
                        rows="4"
                        className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
                >
                    <FcEditImage className="w-5 h-5" />
                    Submit Leave Request
                </button>
            </form>
        </div>
    );
};

export default AddLeave;
