import './App.css'
import React, { Suspense, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import axios from 'axios'
import AxiosClient from './services/axiosClient'
const axiosClient = new AxiosClient()

// components
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

// pages
import Home from './pages/Home'
import Login from './pages/Session/Login'
import CartView from './pages/Cart/CartView'
import Register from './pages/Session/Register'
import ForgotPassword from './pages/Session/ForgotPassword'
import RestorePassword from './pages/Session/RestorePassword'

function App() {
  const backend_url = 'http://localhost:8080'
  const location = useLocation()
  const isSessionPage = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/sendrecoverymail' || location.pathname === '/restorepassword'

  const [data, setData] = useState()
  useEffect(() => {
    axios.get(backend_url)
      .then(res => {
        if(res.data !== data){
          setData(res.data)
        }
      })
  }, [])


  // tomamos los datos del usuario
  const [userData, setUserData] = useState(null)

  useEffect(() => {
      axiosClient.getRequest({
          url: `${backend_url}/api/auth/currentuser`,
          callbackSuccess: (res) => {
              console.log('User Data: ', res.data.currentUser)
              setUserData(res.data.currentUser)
          },
          callbackError: (error) => {
              console.error('Error checking current user: ', error)
          }
      })
  }, [])

  const userCart = userData ? userData.cart : null

  return (
    <Suspense fallback={<div>Loading...</div>} >
        <div className='grid-container'>
          {!isSessionPage && <Navbar className="navbar" />}
          <div className='main'>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/sendrecoverymail' element={<ForgotPassword />} />
              <Route path='/restorepassword' element={<RestorePassword />} />
              <Route path='/' element={<Home />} />
              <Route path={`/carts/${userCart}`} element={<CartView />}/>
            </Routes>
          </div>
          {!isSessionPage && <Footer className="footer" />}
        </div>
    </Suspense>
  )
}

export default App
