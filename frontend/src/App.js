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
import Login from './pages/Session/Login'
import Register from './pages/Session/Register'

import Home from './pages/Home/Home'
import Faqs from './pages/Faqs/Faqs'
import AboutUs from './pages/AboutUs/AboutUs'
import Contact from './pages/Contact/Contact'

import CartView from './pages/Cart/CartView'

import Products from './pages/Products/Products'
import ProfileView from './pages/Profile/ProfileView'

import ForgotPassword from './pages/Session/ForgotPassword'
import RestorePassword from './pages/Session/RestorePassword'

import AdminUsers from './pages/Admin/AdminUsers/AdminUsers'
import AdminProducts from './pages/Admin/AdminProducts/AdminProducts'


function App() {
  const backend_url = 'http://localhost:8080'
  const location = useLocation()
  const isSessionPage = location.pathname === '/login' || 
                        location.pathname === '/register' || 
                        location.pathname === '/sendrecoverymail' || 
                        location.pathname === '/restorepassword'

  // loaders
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // datos
  const [data, setData] = useState()
  const [userData, setUserData] = useState(null)

  // tomamos datos
  useEffect(() => {
    setLoading(true)
    setError(null)

    // datos del backend
    axios.get(backend_url)
      .then(res => {
        if (res.data !== data) {
          setData(res.data)
        }
      })
      .catch(error => {
        console.error('Error fetching initial data: ', error)
        setError('Error fetching initial data')
        setLoading(false)
      })

    // datos de usuario
    axiosClient.getRequest({
      url: `${backend_url}/api/auth/currentuser`,
      callbackSuccess: (res) => {
        setUserData(res.data.currentUser)
      },
      callbackError: (error) => {
        console.error('Error checking current user: ', error)
      }
    })

    setLoading(false)
  }, [location.pathname])

  // obtenemos ID de carrito y usuario
  const userCart = userData ? userData.cart : null
  const userId = userData ? userData.id : null

  return (
    <Suspense fallback={<div>Loading...</div>} >
      {loading && <div>Loading...</div>}
      {error && <div> Error: {error.message} </div>}
      {!loading && !error && (
        <div className='grid-container'>
          {!isSessionPage && <Navbar className="navbar" />}
          <div className='main'>
            <Routes>
              {/* Session routes */}
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/sendrecoverymail' element={<ForgotPassword />} />
              <Route path='/restorepassword' element={<RestorePassword />} />
              {/* nav routes */}
              <Route path='/' element={<Home />} />
              <Route path='/products' element={<Products />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/about' element={<AboutUs />} />
              <Route path='/faqs' element={<Faqs />} />
              <Route path={`/carts/${userCart}`} element={<CartView />} />
              <Route path={`/users/${userId}`} element={<ProfileView />} />
              {/* Administration routes */}
              <Route path='/adminproducts' element={<AdminProducts />} />
              <Route path='/adminusers' element={<AdminUsers />} />
            </Routes>
          </div>
          {!isSessionPage && <Footer className="footer" />}
        </div>
      )}

    </Suspense>
  )
}

export default App
