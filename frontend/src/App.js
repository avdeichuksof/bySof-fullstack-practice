import './App.css'
import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

// components
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'


// pages
import Home from './pages/home'
import Products from './pages/Products'

// const Home = React.lazy(() => import('./X'))

function App() {
  return (
    <Suspense fallback="loading" >
      <div className='grid-container'>
        <Navbar className="navbar"/>
          <div className='main'>
            <Routes>
              <Route path='/' exact Component={Home} />
              <Route path='/api/products' exact Component={Products}/>
            </Routes>
          </div>
        <Footer className="footer"/>
      </div>
    </Suspense>
  )
}

export default App
