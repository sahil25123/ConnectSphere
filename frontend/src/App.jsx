import { useState } from 'react'
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from './context/AuthContext';  // Import AuthProvider

import LandingPage from './pages/landing'
import Authentication from './pages/Authentication'
import { ForgotPasswordForm } from './components/forgot-password-form';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <AuthProvider>  {/* Wrap Routes with AuthProvider */}
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/auth" element={<Authentication/>}/>
          <Route path="/forgot-password" element={<ForgotPasswordForm/>}/>
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App