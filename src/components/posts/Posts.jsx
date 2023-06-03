import { Box } from '@mui/material'
import React from 'react'
import Post from './post/Post'

const Posts = () => {
  return (
    <Box
      flex={4} p={2} pt={1}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Post />
      <Post />
      <Post />
      <Post />
      
    </Box>
  )
}

export default Posts