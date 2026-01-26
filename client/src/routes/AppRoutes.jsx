import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signin from '../pages/Signin'
import FacultyDashboard from '../pages/faculty/FacultyDashboard'
import StudentDashboard from '../pages/student/StudentDashboard'
import AdminDashboard from '../pages/admin/AdminDashboard'
import ProtectedRoutes from '../auth/ProtectedRoutes'
const AppRoutes = () => {   
    return (
        <Routes>
          <Route path="/login" element={<Signin />} />
          <Route path="/faculty" element={<ProtectedRoutes role="FACULTY"><FacultyDashboard /></ProtectedRoutes>} />
          <Route path="/student" element={<ProtectedRoutes role="STUDENT"><StudentDashboard /></ProtectedRoutes>} />
          <Route path="/admin" element={<ProtectedRoutes role="ADMIN"><AdminDashboard /></ProtectedRoutes>} />
        </Routes>
    )
}
export default AppRoutes