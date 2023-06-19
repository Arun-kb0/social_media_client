import { Box } from '@mui/material'
import React, { useEffect, Fragment, useState } from 'react'
import Post from './post/Post'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../../redux/features/post/postActions'
import { StyledPostsBox } from './styles'

import { Waypoint } from 'react-waypoint'

const Posts = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const [isCancelled, setIsCancelled] = useState(false)
  const { posts, currentPage, numberOfPages } = useSelector(state => state.post)

  useEffect(() => {
    if(!isCancelled){
      console.log('get called '+ page)
      dispatch(getPosts(page))
    }
  }, [page])


  const handlePage = () => {
    if (page < numberOfPages) {
      setPage(prev => prev + 1)
    } else {
      setIsCancelled(true)
    }
    console.log(`page ` + page)
  }

  console.log(posts)
  return (
    <StyledPostsBox >
      <Box >
        {posts?.map((post, index) => (
          <Fragment key={`fragment${post._id}`}>
            <Post post={post} key={post._id} />
            {/* {index === posts.length - 3 && */}
            {index === posts.length - 2 &&
              <Waypoint onPositionChange={handlePage} key={`waypoint${post._id}`} />}
          </Fragment>
        ))}
      </Box>
    </StyledPostsBox>

  )
}

export default Posts