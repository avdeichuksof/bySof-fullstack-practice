import './App.css'
import React, { Suspense, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'

// components
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

// pages
import Home from './pages/Home'
import Login from './pages/Session/Login'
import Register from './pages/Session/Register'
import axios from 'axios'

// context
import { AuthProvider } from './context/AuthContext'

function App() {
  const backend_url = 'http://localhost:8080'

  const [data, setData] = useState()
  useEffect(() => {
    axios.get(backend_url)
      .then(res => {
        setData(res.data)
      })
  }, [data])

  return (
    <Suspense fallback={<div>Loading...</div>} >
      <AuthProvider>
        <div className='grid-container'>
          <Navbar className="navbar" />
          <div className='main'>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/' element={<Home />} />
            </Routes>
          </div>
          <Footer className="footer" />
        </div>
      </AuthProvider>
    </Suspense>
  )
}

export default App
