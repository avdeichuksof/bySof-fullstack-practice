import './App.css'
import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'


// components
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

// pages
import Home from './pages/Home'
import Login from './pages/Session/Login'
import Register from './pages/Session/Register'


function App() {
  const baseURL = process.env.REACT_APP_BASE_URL
  return (
    <Suspense fallback={<div>Loading...</div>} >
      <div className='grid-container'>
        <Navbar className="navbar"/>
          <div className='main'>
              <Routes>
                <Route path='/login'  element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/' element={<Home />} />
              </Routes>
          </div>
        <Footer className="footer"/>
      </div>
    </Suspense>
  )
}

export default App
