import { Home } from 'lucide-react'
import HomePage from './Pages/HomePage/HomePage'
import './index.css'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignIn from './Pages/HomePage/signIn.jsx';
function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signin' element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
