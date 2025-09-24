import { Home } from 'lucide-react'
import HomePage from './Pages/HomePage/HomePage'
import './index.css'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignIn from './Pages/auth/signIn.jsx';
import Register from './Pages/auth/register.jsx';
import GenerateTT from './Pages/GenerateTT.jsx';
import Rooms from './Pages/Rooms.jsx';
import DashBoard from './Pages/AdminDashBoard.jsx';
import Timetable from './Pages/timetable.jsx';
import StudentDashboard from './Pages/StudentsDashboard/Dashboard-students.jsx';
import Faculty from './Pages/Faculty.jsx';
import UserRoles from './Pages/UserRoles.jsx';
import StudentTimetable from './Pages/StudentsDashboard/StudentTimetable.jsx';
import Courses from './Pages/StudentsDashboard/StudentCourses.jsx';
function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/admin-dashboard' element={<DashBoard />} />
        <Route path='/register' element={<Register />} />
        <Route path='/admin-gentt' element={<GenerateTT />} />
        <Route path='/admin-rooms' element={<Rooms />} />
        <Route path='/admin-timetable' element={<Timetable />} />
        <Route path='/admin-faculty' element={<Faculty />} />
        <Route path='/student-dashboard' element={<StudentDashboard />} />
        <Route path='/roles' element={<UserRoles />} />
        <Route path='student/timetable' element={<StudentTimetable />} />
        <Route path='student/courses' element={<Courses />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
