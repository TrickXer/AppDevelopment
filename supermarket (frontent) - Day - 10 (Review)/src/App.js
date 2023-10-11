import './App.css';
import { Box } from '@mui/material';
import defaultAvatar from './data/images/male-avatar.png'
import React, { Suspense, useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Workers from './components/Workers';
import Orders from './components/Orders';
import Footer from './components/Footer';
import store from './store/store';
import CartLoading from './components/CartLoading';
import CountUp from './components/CountUp';
import Cookies from 'js-cookie';
import { updateWorker } from './api/axiosRequests.mjs';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrent } from './store/reducer';

const Home = React.lazy(() => import('./components/Home'))
const Login = React.lazy(() => import('./components/Login'))
const Signin = React.lazy(() => import('./components/Signin'))
const Products = React.lazy(() => import('./components/Products'))
const AdminLogin = React.lazy(() => import('./components/AdminLogin'))


function App() {
  const navigate = useNavigate()
  const location = useLocation()

  const [token, setToken] = useState(Cookies.get('login-token'))
  const current = useSelector((state) => state.store.current)

  const dispatch = useDispatch()

  useEffect(() => {
    setToken(Cookies.get('login-token'))

    if (token) dispatch(setCurrent(JSON.parse(atob(token.split(".")[1])).worker))

    if (!['/', '/log-in', '/sign-up', '/admin-login'].includes(location.pathname) && !token) {
      navigate('/')
    }
  }, [dispatch, location.pathname, navigate, token])

  const logout = () => {
    const time = new Date(new Date().toUTCString()).toLocaleString("en-us", { timeZone: 'Asia/Kolkata' })
    const uuid = JSON.parse(atob(token.split(".")[1])).worker.uuid

    const updates = {
      workerId: uuid,
      workerTime: time,
      isWorkerInDuty: false
    }
    updateWorker(updates)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <NavBar navigate={navigate} logout={logout} defaultAvatar={defaultAvatar} />
      <Box sx={{ width: '100%', height: `calc(100vh - ${ ['/', '/sign-up', '/log-in'].includes(location.pathname) ? '128px' : '64px' })`, mt: '64px' }}>
        <Routes>
          {/* Home page */}
          <Route path='/' element={
            <Suspense fallback={<CartLoading />}>
              <Home navigate={navigate} defaultAvatar={defaultAvatar} />
            </Suspense>
          } />

          {/* Sign page */}
          <Route path='/sign-up' element={
            <Suspense fallback={<CartLoading />}>
              <Signin navigate={navigate} defaultAvatar={defaultAvatar} />
            </Suspense>
          } />

          {/* login page */}
          <Route path='/log-in' element={
            <Suspense fallback={<CartLoading />}>
              <Login navigate={navigate} defaultAvatar={defaultAvatar} />
            </Suspense>
          } />

          {/* Admin login */}
          <Route path='/admin-login' element={
            <Suspense fallback={<CartLoading /> }>
              <AdminLogin navigate={navigate} defaultAvatar={defaultAvatar} />
            </Suspense>
          } />

          {
            token && 
            <>
              {/* products page */}
              <Route path='/products' element={
                <Suspense fallback={<CartLoading />}>
                  <Products navigate={navigate} />
                </Suspense>
              } />

              {/* dashboard page */}
              <Route path='/dashboard' element={
                <Suspense fallback={<CartLoading />}>
                  <Dashboard logout={logout} navigate={navigate} />
                </Suspense>
              } />

              {/* orders page */}
              <Route path='/orders' element={
                <Suspense fallback={<CartLoading />}>
                  <Orders logout={logout} navigate={navigate} />
                </Suspense>
              } />

              {/* users page */}
              <Route path='/users' element={
                <Suspense fallback={<CartLoading />}>
                  <Users logout={logout} navigate={navigate} defaultAvatar={defaultAvatar} />
                </Suspense>
              } />

              {/* workers page */}
              {
                current.role === "ROLE_ADMIN" &&
                <Route path='/workers' element={
                  <Suspense fallback={<CartLoading />}>
                    <Workers logout={logout} navigate={navigate} defaultAvatar={defaultAvatar} />
                  </Suspense>
                } />
              }
            </>
          }
        </Routes>
      </Box>
      { ['/', '/sign-up', '/log-in', '/admin-login'].includes(location.pathname) && <Footer /> }
    </Box>
  );
}

export default App;
