import React from 'react'
import { ThemeProvider } from '@emotion/react'
import { theme } from './theme'
import { BrowserRouter, Routes, Router, Route } from 'react-router-dom'

import Auth from './components/auth/Auth'
import CreatePost from './components/createPost/CreatePost'
import Home from './components/Home/Home'
import Navbar from './components/navbar/Navbar'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<CreatePost />} />
          <Route path='/auth' element={<Auth />} />

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App