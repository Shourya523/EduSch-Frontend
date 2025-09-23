import { Home } from 'lucide-react'
import HomePage from './Pages/HomePage/HomePage'
import './index.css'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignIn from './Pages/auth/signIn.jsx';
import Register from './Pages/auth/register.jsx';
import GenerateTT from './Pages/GenerateTT.jsx';
import Rooms from './Pages/Rooms.jsx';
import DashBoard from './Pages/DashBoard.jsx';
import Timetable from './Pages/timetable.jsx';
function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/dashboard' element={<DashBoard />} />
        <Route path='/register' element={<Register />} />
        <Route path='/gentt' element={<GenerateTT />} />
        <Route path='/rooms' element={<Rooms />} />
        <Route path='/timetable' element={<Timetable />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
