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
import ViewAssignments from './components/ViewAssignments'
/* ================= FACULTY ================= */
import FacultyDashboard from './pages/faculty/FacultyDashboard'
import FacultyAssignments from './pages/faculty/pages/Assignments'
import FacultyNotes from './pages/faculty/pages/Notes'
import FacultySubjects from './pages/faculty/pages/Subjects'
import Notifications from './pages/faculty/pages/Notifications'
import FacultyLayout from './pages/faculty/FacultyLayout'

/* ================= STUDENT ================= */
import StudentDashboardLayout from './pages/student/StudentDashboard'
import StudentDashboardContent from './pages/student/Dashboard'
import StudentAssignments from './pages/student/Assignments'
import StudentNotes from './pages/student/Notes'

/* ================= ADMIN ================= */
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import RegisterStudentModal from './pages/admin/componenets/RegisterStudentModal'
import RegisterFacultyModal from './pages/admin/componenets/RegisterFacultyModal'
import AdminStudents from './pages/admin/AdminStudents'
import AdminFaculty from './pages/admin/AdminFaculty'
import AdminNotifications from './pages/admin/AdminNotifications'
import AdminClass from './pages/admin/componenets/AdminClass'
import AdminSubject from './pages/admin/componenets/AdminSubject'
import AdminDepartment from './pages/admin/componenets/AdminDepartment'

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

      <Route element={<ProtectedRoutes role="ROLE_FACULTY"><FacultyLayout /></ProtectedRoutes>}>
        <Route path="/role_faculty" element={<FacultyDashboard />} />
        <Route path="/role_faculty/subjects" element={<FacultySubjects />} />
        <Route path="/role_faculty/assignments" element={<FacultyAssignments />} />
        <Route path="/role_faculty/notes" element={<FacultyNotes />} />
        <Route path="/role_faculty/notification" element={<Notifications />} />
      </Route>

      <Route element={<ProtectedRoutes role="ROLE_ADMIN"><AdminLayout /></ProtectedRoutes>}>
        <Route path="/role_admin" element={<AdminDashboard />} />
        <Route path="/role_admin/register_student" element={<RegisterStudentModal />} />
        <Route path="/role_admin/register_faculty" element={<RegisterFacultyModal />} />
        <Route path="/role_admin/students" element={<AdminStudents />} />
        <Route path="/role_admin/faculty" element={<AdminFaculty />} />
        <Route path="/role_admin/notifications" element={<AdminNotifications />} />
        <Route path='/role_admin/department' element={<AdminDepartment />} />
        <Route path='/role_admin/class' element={<AdminClass />} />
        <Route path='/role_admin/subject' element={<AdminSubject />} />
        <Route path='/role_admin/assignments' element={<ViewAssignments />} />
      </Route>

      <Route path="*" element={<Error />} />

    </Routes>
  )
}

export default App;
