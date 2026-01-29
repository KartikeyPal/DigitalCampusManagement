import './App.css'
import { Route, Routes } from 'react-router-dom'

import HomePage from './pages/HomePage'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import About from './pages/About'

import FacultyDashboard from './pages/faculty/FacultyDashboard'
import FacultyAssignments from './pages/faculty/pages/Assignments'
import FacultyNotes from './pages/faculty/pages/Notes'
import FacultySubjects from './pages/faculty/pages/Subjects'

import StudentDashboard from './pages/student/Dashboard'
import StudentAssignments from './pages/student/Assignments'
import StudentNotes from './pages/student/Notes'
import Notification from './pages/Notification'

import AdminDashboard from './pages/admin/AdminDashboard'

import ProtectedRoutes from './auth/ProtectedRoutes'
import UnAuthorized from './pages/UnAuthorized'
import Error from './pages/Error'

function App() {
  return (
    <Routes>

      {/* ================= PUBLIC ================= */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<About />} />
      <Route path="/unauthorized" element={<UnAuthorized />} />
      <Route path="*" element={<Error />} />

      {/* ================= FACULTY ================= */}
      <Route element={<ProtectedRoutes role="ROLE_FACULTY" />}>
        <Route path="/role_faculty" element={<FacultyDashboard />} />
        <Route path="/faculty/subjects" element={<FacultySubjects />} />
        <Route path="/faculty/assignments" element={<FacultyAssignments />} />
        <Route path="/faculty/notes" element={<FacultyNotes />} />
      </Route>

      {/* ================= STUDENT ================= */}
      <Route element={<ProtectedRoutes role="ROLE_STUDENT" />}>
        <Route path="/role_student" element={<StudentDashboard />} />
        <Route path="/role_student/assignment" element={<StudentAssignments />} />
        <Route path="/role_student/notes" element={<StudentNotes />} />
        <Route path="/role_student/notification" element={<Notification />} />
      </Route>

      {/* ================= ADMIN ================= */}
      <Route element={<ProtectedRoutes role="ROLE_ADMIN" />}>
        <Route path="/role_admin" element={<AdminDashboard />} />
      </Route>

    </Routes>
  )
}

export default App;
