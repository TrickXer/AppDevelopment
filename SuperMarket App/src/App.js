import './App.css';
import { Container } from '@mui/material';
import defaultAvatar from './data/images/male-avatar.png'
import React, { Suspense, useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

const Home = React.lazy(() => import('./components/Home'))
const Login = React.lazy(() => import('./components/Login'))
const Signin = React.lazy(() => import('./components/Signin'))


function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user-data')) === null ? {} : JSON.parse(localStorage.getItem('user-data')))
  const [isLogin, setIsLogin] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    console.log(user)
  }, [user])

  return (
    <Container maxWidth={false} sx={{ minHeight: '100vh', display: 'grid', placeContent: 'center' }}>
      <Routes>
        {/* Home page */}
        <Route path='/' element={
          <Suspense fallback='Loading...'>
            <Home isLogin={isLogin} setIsLogin={setIsLogin} defaultAvatar={defaultAvatar} />
          </Suspense>
        } />

        {/* Sign page */}
        <Route path='/sign-in' element={
          <Suspense fallback='Loading...'>
            <Signin setUser={setUser} setIsLogin={setIsLogin} navigate={navigate} defaultAvatar={defaultAvatar} />
          </Suspense>
        } />

        {/* login page */}
        <Route path='/log-in' element={
          <Suspense fallback='Loading...'>
            <Login setIsLogin={setIsLogin} user={user} setUser={setUser} navigate={navigate} defaultAvatar={defaultAvatar} />
          </Suspense>
        } />
      </Routes>
    </Container>
  );
}

export default App;
