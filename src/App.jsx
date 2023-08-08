import React, { useEffect, useState } from 'react'
import { ThemeProvider } from '@emotion/react'
import { BrowserRouter, Routes,  Route, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { theme } from './theme'

import Auth from './components/auth/Auth'
import CreatePost from './components/createPost/CreatePost'
import Home from './components/Home/Home'
import Navbar from './components/navbar/Navbar'
import { getLocalStroageUser } from './redux/features/auth/authActions'
import EditPost from './components/createPost/EditPost'
import UserProfile from './components/userProfile/UserProfile'
import Chat from './components/chat/Chat'
import { socketConnect, socketDisConnect } from './redux/features/socketio/socketioActions'


const App = () => {
  const dispatch = useDispatch()
  const [isCancelled, setIsCancelled] = useState(false)
  const { authData } = useSelector(state => state.auth)

  useEffect(() => {
    if (!isCancelled)
      dispatch(getLocalStroageUser())
    return () => setIsCancelled(true)
  }, [])


  useEffect(() => {
    dispatch(socketConnect())
    return () => {
      dispatch(socketDisConnect())
    }
  }, [authData])


  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/create' element={authData?.result ? <CreatePost /> : <Navigate to='/auth' />} />
          <Route path='/edit' element={authData?.result ? <EditPost /> : <Navigate to='/auth' />} />
          <Route path='/profile' element={authData?.result ? <UserProfile /> : <Navigate to='/auth' />} />
          <Route path='/chat' element={authData?.result ? <Chat /> : <Navigate to='/auth' />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App