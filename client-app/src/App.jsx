import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Start from './pages/Start'
import Sign from './pages/Sign'
import Home from './pages/Home'
import './index.css'
import Login from './pages/Login'
import TestPage from './pages/TestPage'
import ResultPage from './pages/ResultPage'

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Start/>} />
          <Route path="/sign" element={<Sign/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/tests/*" element={<TestPage/>} />
          <Route path="/result" element={<ResultPage/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
