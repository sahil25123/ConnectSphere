import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css'
import LandingPage from './pages/landing'

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
