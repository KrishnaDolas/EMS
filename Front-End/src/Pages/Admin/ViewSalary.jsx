import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FcSearch, FcMoneyTransfer, FcCalendar, FcBusinessman } from 'react-icons/fc';

const ViewSalary = () => {
  const [salaries, setSalaries] = useState(null);
  const [filteredSalaries, setFilteredSalaries] = useState(null);
  const apiUrl = 'https://bq6kmv94-8000.inc1.devtunnels.ms';
  const { id } = useParams();

  const fetchSalaries = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/salary/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.data.success) {
        setSalaries(response.data.salary);
        setFilteredSalaries(response.data.salary);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  const filterSalaries = (e) => {
    const q = e.target.value;
    if (salaries) {
      const filteredRecords = salaries.filter((salary) =>
        salary.employeeId.employeeId.toLowerCase().includes(q.toLowerCase())
      );
      setFilteredSalaries(filteredRecords);
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 to-white min-h-screen">
      {filteredSalaries === null ? (
        <div className="text-center text-lg font-semibold text-gray-600">
          Loading...
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-extrabold text-gray-800 inline-flex items-center gap-2">
              <FcMoneyTransfer className="text-4xl" /> Salary History
            </h2>
            <p className="text-gray-500 mt-1">
              View all salary records for the selected employee
            </p>
          </div>

          <div className="flex justify-end mb-4">
            <div className="relative">
              <FcSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl" />
              <input
                type="text"
                placeholder="Search by EMP ID"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                onChange={filterSalaries}
              />
            </div>
          </div>

          {filteredSalaries.length > 0 ? (
            <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      SR No
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      <FcBusinessman className="inline-block mr-1" /> Emp ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Basic Salary
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Allowance
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Deduction
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      <FcCalendar className="inline-block mr-1" /> Pay Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {filteredSalaries.map((salary, index) => (
                    <tr key={salary._id} className="hover:bg-blue-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-700">
                        {salary.employeeId.employeeId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">₹ {salary.basicSalary}</td>
                      <td className="px-6 py-4 whitespace-nowrap">₹ {salary.allowance}</td>
                      <td className="px-6 py-4 whitespace-nowrap">₹ {salary.deductions}</td>
                      <td className="px-6 py-4 whitespace-nowrap font-bold text-green-600">
                        ₹ {salary.netSalary}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(salary.payDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-10">
              No Records Found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewSalary;
