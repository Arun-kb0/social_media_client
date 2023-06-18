import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import Post from './post/Post'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../../redux/features/post/postActions'
import { StyledPostsBox } from './styles'

const Posts = () => {
  const dispatch = useDispatch()
  const { posts, currentPage, numberOfPages } = useSelector(state => state.post)

  useEffect(() => {
    dispatch(getPosts())
  }, [])

  console.log(posts)
  return (
    <StyledPostsBox >
      <Box >
        {posts?.map(post => (
          <Post post={post} />
        ))}
      </Box>
    </StyledPostsBox>

  )
}

export default Posts