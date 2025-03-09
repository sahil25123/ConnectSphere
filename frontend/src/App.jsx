import { useState } from 'react'
import "./index.css";  // Ensure this points to your Tailwind CSS file


import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import LandingPage from './pages/landing'
import Authentication from './pages/Authentication'
import { ForgotPasswordForm } from './components/forgot-password-form';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Routes>
        
        <Route path="/" element={<LandingPage/>}/>
        <Route path ="/auth" element={<Authentication/>}/>
        <Route path ="/forgot-password" element={<ForgotPasswordForm/>}/>


      </Routes>
    </Router>
    </>
  )
}

export default App
