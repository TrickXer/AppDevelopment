import './App.css';
import { Box, Typography } from '@mui/material';
import defaultAvatar from './data/images/male-avatar.png'
import React, { Suspense, useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import CartLoading from './components/CartLoading';
import Cookies from 'js-cookie';
import { updateWorker } from './api/axiosRequests.mjs';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrent } from './store/reducer';
import SidePanel from './components/SidePanel';

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

              {/* sidepanel page */}
              <Route path='/view/*' element={
                <Suspense fallback={<CartLoading />}>
                  <SidePanel logout={logout} role={current.role} navigate={navigate} defaultAvatar={defaultAvatar} />
                </Suspense>
              } />
            </>
          }
          <Route path='*' element={ <Typography>404 error - Page Not Found</Typography> } />
        </Routes>
      </Box>
      { ['/', '/sign-up', '/log-in', '/admin-login'].includes(location.pathname) && <Footer /> }
    </Box>
  );
}

export default App;
