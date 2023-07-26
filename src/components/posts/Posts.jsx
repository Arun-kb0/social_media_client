import { Box, Grow, Zoom } from '@mui/material'
import React, { useEffect, Fragment, useState, useMemo } from 'react'
import Post from './post/Post'
import { useDispatch, useSelector } from 'react-redux'
import { getLikedPosts, getPosts, likePostListener } from '../../redux/features/post/postActions'
import { StyledPostsBox } from './styles'

import { Waypoint } from 'react-waypoint'
import useDebounce from '../../hooks/useDebounce'
import { getNotifications } from '../../api/apiIndex'

const Posts = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const [isCancelled, setIsCancelled] = useState(false)
  const [likeStateData, setLikeStateData] = useState(null)
  
  const { posts, currentPage, numberOfPages, postIds, likedPostIds } = useSelector(state => state.post)
  const { authData, userId, username } = useSelector(state => state.auth)
  const { isPostsOpen } = useSelector(state => state.buttonToggle)
  const { socket } = useSelector(state => state.socketioReducer)



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

  // ! fix below  code 
  // ! 

  const handleLike = (data) => {
    const { _id, creator_name, creator_id, setLikeState } = data
    setLikeStateData({ postId: _id, username, creatorId: creator_id })
    console.log(data)

    socket.emit("likePost", { postId: _id, username, creatorId: creator_id });
    setLikeState(prev => ({
      isLiked: !prev.isLiked,
      likeCount: !prev.isLiked ? prev.likeCount + 1 : prev.likeCount - 1
    }))
  }



  useEffect(() => {
    if (socket && likeStateData) {
      const cleanup = dispatch(likePostListener(likeStateData))
      return () => dispatch(cleanup)
    }

  }, [socket, likeStateData])




  // !

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
              creatorId={post.creator_id}

              handleChildLikeData={null}
              handleLike={handleLike}
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