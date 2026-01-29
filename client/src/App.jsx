import './App.css'
import { Route, Routes, Outlet } from 'react-router-dom'

/* ================= PAGES & COMPONENTS ================= */
import HomePage from './pages/HomePage'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import About from './pages/About'
import UnAuthorized from './pages/UnAuthorized'
import Error from './pages/Error'
import Notification from './pages/Notification'

/* ================= FACULTY ================= */
import FacultyDashboard from './pages/faculty/FacultyDashboard'
import FacultyAssignments from './pages/faculty/pages/Assignments'
import FacultyNotes from './pages/faculty/pages/Notes'
import FacultySubjects from './pages/faculty/pages/Subjects'

/* ================= STUDENT ================= */
import StudentDashboardLayout from './pages/student/StudentDashboard' // Layout (Sidebar + Outlet)
import StudentDashboardContent from './pages/student/Dashboard' // Content
import StudentAssignments from './pages/student/Assignments'
import StudentNotes from './pages/student/Notes'

/* ================= ADMIN ================= */
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import RegisterUser from './pages/admin/RegisterUser'
import AdminStudents from './pages/admin/AdminStudents'
import AdminTeachers from './pages/admin/AdminTeachers'
import AdminNotifications from './pages/admin/AdminNotifications'

/* ================= AUTH ================= */
import ProtectedRoutes from './auth/ProtectedRoutes'


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<About />} />
      <Route path="/unauthorized" element={<UnAuthorized />} />

      <Route element={<ProtectedRoutes role="ROLE_STUDENT"><StudentDashboardLayout /></ProtectedRoutes>}>
        <Route path="/role_student" element={<StudentDashboardContent />} />
        <Route path="/role_student/assignment" element={<StudentAssignments />} />
        <Route path="/role_student/notes" element={<StudentNotes />} />
        <Route path="/role_student/notification" element={<Notification />} />
      </Route>

      <Route element={<ProtectedRoutes role="ROLE_FACULTY"><Outlet /></ProtectedRoutes>}>
        <Route path="/role_faculty" element={<FacultyDashboard />} />
        <Route path="/faculty/subjects" element={<FacultySubjects />} />
        <Route path="/faculty/assignments" element={<FacultyAssignments />} />
        <Route path="/faculty/notes" element={<FacultyNotes />} />
      </Route>

      <Route element={<ProtectedRoutes role="ROLE_ADMIN"><AdminLayout /></ProtectedRoutes>}>
        <Route path="/role_admin" element={<AdminDashboard />} />
        <Route path="/role_admin/register" element={<RegisterUser />} />
        <Route path="/role_admin/students" element={<AdminStudents />} />
        <Route path="/role_admin/teachers" element={<AdminTeachers />} />
        <Route path="/role_admin/notifications" element={<AdminNotifications/>} />
      </Route>

      <Route path="*" element={<Error />} />

    </Routes>
  )
}

export default App;
