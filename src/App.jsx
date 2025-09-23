import { Home } from 'lucide-react'
import HomePage from './Pages/HomePage/HomePage'
import './index.css'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignIn from './Pages/auth/signIn.jsx';
import DashBoard from './Pages/DashBoard.jsx';
import GenerateTT from './Pages/GenerateTT.jsx';
function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/dashboard' element ={<DashBoard />} />
        <Route path='/gentt' element ={<GenerateTT />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
