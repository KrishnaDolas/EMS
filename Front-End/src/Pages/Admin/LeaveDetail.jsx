import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import {
  FaBirthdayCake,
  FaBuilding,
  FaUserTie,
  FaBriefcase,
} from 'react-icons/fa'
import { FcBusinessman } from "react-icons/fc";

const LeaveDetail = () => {
  const { id } = useParams()
  const [leave, setLeave] = useState(null)
  const apiUrl = 'https://bq6kmv94-8000.inc1.devtunnels.ms'
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/leave/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        if (res.data.success) {
          setLeave(res.data.leave)
        } else {
          alert('Failed to fetch leave detail.')
        }
      } catch (err) {
        console.error(err)
        alert('Error fetching leave detail.')
      }
    }
    fetchLeave()
  }, [id])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = String(date.getFullYear()).slice(-2)
    return `${day}/${month}/${year}`
  }

  if (!leave) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 text-xl font-semibold text-gray-600">
        Loading...
      </div>
    )
  }

  const handleAction = async (id,status)=>{
     try {
        const res = await axios.put(`${apiUrl}/api/leave/${id}`,{status}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        if (res.data.success) {
          navigate('/admin-dashboard/leaveList')
        } else {
          alert('Failed to fetch leave detail.')
        }
      } catch (err) {
        console.error(err)
        alert('Error fetching leave detail.')
      }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 relative">
      <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl shadow-2xl p-10 relative overflow-hidden">
        {/* Profile Image — top right */}
        <div className="absolute top-6 right-6 pb-4">
  {leave.employeeId.userId.profileImage && leave.employeeId.userId.profileImage.trim().length > 0 ? (
    <img
      src={`http://localhost:8000/${leave.employeeId.userId.profileImage}`}
      alt="Profile"
      className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover border-4 border-white shadow-lg hover:scale-105 transition-transform duration-300"
    />
  ) : (
    <div className="w-36 h-36 md:w-44 md:h-44 flex items-center justify-center rounded-full bg-white border-4 border-white shadow-lg">
      <FcBusinessman className="w-24 h-24 md:w-28 md:h-28" />
    </div>
  )}
</div>


        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4 text-left">
          Leave Detail
        </h2>

        {/* Name + ID */}
        <div className="mb-8 text-left">
          <h3 className="text-3xl font-bold text-gray-800">{leave.employeeId.userId.name}</h3>
          <p className="text-gray-600">
            Employee ID: <span className="font-medium">{leave.employeeId.employeeId}</span>
          </p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
          <InfoCard
            icon={<FaBirthdayCake className="text-pink-500" />}
            title="Leave Type"
            value={leave.leaveType}
          />
          <InfoCard
            icon={<FaBuilding className="text-green-500" />}
            title="Reason"
            value={leave.reason}
          />
          <InfoCard
            icon={<FaBuilding className="text-green-500" />}
            title="Department"
            value={leave.employeeId.department.dep_name}
          />
          <InfoCard
            icon={<FaUserTie className="text-yellow-500" />}
            title="Start Date"
            value={formatDate(leave.startDate)}
          />
          <InfoCard
            icon={<FaUserTie className="text-yellow-500" />}
            title="End Date"
            value={formatDate(leave.endDate)}
          />
          {leave.status === 'Pending' ? (
            <div className="flex flex-col gap-4 bg-white rounded-xl p-4 shadow hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-4">
                <FaBriefcase className="text-blue-600 text-2xl" />
                <p className="text-gray-700 font-semibold">Action</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleAction(leave._id,'Approved')}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleAction(leave._id,'Rejected')}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  Reject
                </button>
              </div>
            </div>
          ) : (
            <InfoCard
              icon={<FaBriefcase className="text-blue-600" />}
              title="Status"
              value={leave.status || 'N/A'}
            />
          )}
        </div>
      </div>
    </div>
  )
}

const InfoCard = ({ icon, title, value }) => (
  <div className="flex items-center gap-4 bg-white rounded-xl p-4 shadow hover:shadow-lg transition-all duration-300">
    <div className="text-2xl">{icon}</div>
    <div>
      <p className="text-gray-700 font-semibold">{title}</p>
      <p className="text-gray-600 text-sm">{value}</p>
    </div>
  </div>
)

export default LeaveDetail