import React, { useEffect } from 'react'
import { ThemeProvider } from '@emotion/react'
import { theme } from './theme'
import { BrowserRouter, Routes, Router, Route, Navigate } from 'react-router-dom'

import Auth from './components/auth/Auth'
import CreatePost from './components/createPost/CreatePost'
import Home from './components/Home/Home'
import Navbar from './components/navbar/Navbar'
import { useSelector , useDispatch } from 'react-redux'
import { getLocalStroageUser } from './redux/features/auth/authActions'

const App = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getLocalStroageUser())
  },[])
  const { authData } = useSelector(state => state.auth)

  console.log('home  user ' + authData)

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/create' element={authData?.result ? <CreatePost /> : <Navigate to='/auth' />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App