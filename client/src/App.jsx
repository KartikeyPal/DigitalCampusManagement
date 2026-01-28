import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import About from './pages/About.jsx'
import FacultyDashboard from './pages/faculty/FacultyDashboard'
import StudentDashboard from './pages/student/StudentDashboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import ProtectedRoutes from './auth/ProtectedRoutes'
import UnAuthorized from './pages/UnAuthorized'
import Error from './pages/Error'
import Assignment from './pages/student/Assignments.jsx'
import Notes from './pages/student/Notes.jsx'
import Dashboard from './pages/student/Dashboard.jsx'
import Notification from './pages/Notification.jsx'
// import Timetable from './pages/student/Timetable.jsx'
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='*' element={<Error />} />
        <Route path='/about' element={<About />} />
        <Route path="/unauthorized" element={<UnAuthorized />} />
        <Route path="/role_faculty" element={<ProtectedRoutes role="ROLE_FACULTY" children={<FacultyDashboard/>} />} ></Route>
        <Route element={<ProtectedRoutes role="ROLE_STUDENT" children={<StudentDashboard/>} />} >
          <Route path='/role_student' element={<Dashboard/>} />
          <Route path='/role_student/assignment' element={<Assignment/>} />
          <Route path='/role_student/notes' element={<Notes/>} />
          <Route path='/role_student/notification' element={<Notification/>} />
          {/* <Route path="/timetable" element={<Timetable/>} /> */}
        </Route>
        <Route path="/role_admin" element={<ProtectedRoutes role="ROLE_ADMIN" children={<AdminDashboard/>} />} />
      </Routes>
    </>
  ) 
}

export default App
