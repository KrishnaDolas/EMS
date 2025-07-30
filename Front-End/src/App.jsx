// App.jsx
import React from 'react'
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import Login from './Pages/Login'
// Admin Routes 
import Admindashboard from './Pages/Admin/Admindashboard'
import Employeedashboard from './Pages/Employee/Employeedashboard'
import PrivateRoutes from './Utils/PrivateRoutes'
import RolebasedRoutes from './Utils/RolebasedRoutes'
import AdminSummary from './Components/AdminSummary'
import DepartmentList from './Pages/Admin/DepartmentList'
import AddDepartment from './Pages/Admin/AddDepartment'
import Editdepartment from './Pages/Admin/Editdepartment'
import EmployeeList from './Pages/Admin/EmployeeList'
import AddEmployee from './Pages/Admin/AddEmployee'
import ViewEmployee from './Pages/Admin/ViewEmployee'
import EditEmployee from './Pages/Admin/EditEmployee'
import AddSalary from './Pages/Admin/AddSalary'
import ViewSalary from './Pages/Admin/ViewSalary'
import AdminLeaveList from './Pages/Admin/LeaveList'
import LeaveDetail from './Pages/Admin/LeaveDetail'
// Employee Routes 
import EmployeeSummary from './Components/EmpSummaryCard'
import LeaveList from './Pages/Employee/LeaveList'
import AddLeave from './Pages/Employee/AddLeave'
import EmpSetting from './Pages/Employee/EmpSetting'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin-dashboard" />} />
      <Route path="/login" element={<Login />} />


      {/* Admin Routes */}
      <Route
        path="/admin-dashboard"
        element={
          <PrivateRoutes>
            <RolebasedRoutes requiredRole={['admin']}>
              <Admindashboard />
            </RolebasedRoutes>
          </PrivateRoutes>
        }
      >

        <Route index element={<AdminSummary />}></Route>
        <Route path='/admin-dashboard/departments' element={<DepartmentList />}></Route>
        <Route path='/admin-dashboard/add-department' element={<AddDepartment />}></Route>
        <Route path='/admin-dashboard/department/:id' element={<Editdepartment />}></Route>

        <Route path='/admin-dashboard/employees' element={<EmployeeList />}></Route>
        <Route path='/admin-dashboard/add-employee' element={<AddEmployee />}></Route>
        <Route path='/admin-dashboard/employees/:id' element={<ViewEmployee />}></Route>
        <Route path='/admin-dashboard/employees/edit/:id' element={<EditEmployee />}></Route>
        <Route path='/admin-dashboard/employees/salary/:id' element={<ViewSalary />}></Route>
        <Route path='/admin-dashboard/salary/add' element={<AddSalary />}></Route>
        <Route path='/admin-dashboard/leaveList' element={<AdminLeaveList />}></Route>
        <Route path='/admin-dashboard/leaveList/leavedetails/:id' element={<LeaveDetail />}></Route>
      </Route>

      {/* Employee Routes  */}

      <Route
        path="/employee-dashboard"
        element={
          <PrivateRoutes>
            <RolebasedRoutes requiredRole={['employee', 'admin']}>
              <Employeedashboard />
            </RolebasedRoutes>
          </PrivateRoutes>
        }
      >

        <Route index element={<EmployeeSummary />}></Route>
        <Route path='MyProfile/:id' element={<ViewEmployee />}></Route>
        <Route path='Leaves' element={<LeaveList />}></Route>
        <Route path='AddLeave' element={<AddLeave />}></Route>
        <Route path='Salary/:id' element={<ViewSalary />}></Route>
        <Route path='Setting' element={<EmpSetting />}></Route>

      </Route>
    </Routes>
  )
}

export default App