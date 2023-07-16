import { Box, Grow, Zoom } from '@mui/material'
import React, { useEffect, Fragment, useState } from 'react'
import Post from './post/Post'
import { useDispatch, useSelector } from 'react-redux'
import { getLikedPosts, getPosts } from '../../redux/features/post/postActions'
import { StyledPostsBox } from './styles'

import { Waypoint } from 'react-waypoint'

const Posts = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const [isCancelled, setIsCancelled] = useState(false)

  const { posts, currentPage, numberOfPages, postIds, likedPostIds } = useSelector(state => state.post)
  const { authData, userId, username } = useSelector(state => state.auth)
  const { isPostsOpen } = useSelector(state => state.buttonToggle)


  useEffect(() => {
    if (!isCancelled) {
      console.log('get called ' + page)
      dispatch(getPosts(page))
    }
  }, [page])


  useEffect(() => {
    if (authData?.result) {
      console.log('getliked called')
      dispatch(getLikedPosts(postIds))
    }
  }, [postIds.length])


  const handlePage = () => {
    if (page < numberOfPages) {
      setPage(prev => prev + 1)
    } else {
      setIsCancelled(true)
    }
    console.log(`page ` + page)
  }



  // console.log(posts)
  return (
    <StyledPostsBox >

      <Box sx={{ paddingBottom: 7 }} id='cards container'>
        {posts?.map((post, index) => (
          <Fragment key={`fragment${post._id}`} >


            {<Post
              key={post._id}
              post={post}
              likedPostIds={likedPostIds}
              userId={userId}
              username={username}
              isPostsOpen={isPostsOpen}
            />}

            {/* {index === posts.length - 3 && */}
            {index === posts.length - 2 &&
              <Waypoint onPositionChange={handlePage} key={`waypoint${post._id}`} />}
          </Fragment>
        ))}
      </Box>

    </StyledPostsBox >

  )
}

export default Posts