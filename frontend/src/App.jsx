import { useState } from 'react'
import "./index.css";  // Ensure this points to your Tailwind CSS file


import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import LandingPage from './pages/landing'
import Test_page from './pages/test_page'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Routes>
        
        <Route path="/" element={<LandingPage/>}/>


      </Routes>
    </Router>
    </>
  )
}

export default App
