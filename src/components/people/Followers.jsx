import React, { useEffect, useState } from 'react'

import Person from './Person'
import { StyledPostsBox } from '../posts/styles'
import { useDispatch, useSelector } from 'react-redux'
import { getFollowers } from '../../redux/features/user/userActions'
import { Typography } from '../../imports/materialuiComponents'


const Followers = ({ isReqestSend=false }) => {
  const dispatch = useDispatch()
  const { followers } = useSelector(state => state.user)
  const [isCancelled, setIsCancelled] = useState(false)

  useEffect(() => {
    if (!isCancelled && !isReqestSend) {
      console.log("follower component req send ")
      dispatch(getFollowers())
    }
    return () => {
      setIsCancelled(true)
    }
  }, [])



  return (
    <StyledPostsBox >
      {
        followers?.length === 0
          ? <Typography variant='h6'>No followers yet</Typography>
          : followers?.map((user) => (
            <Person
              key={user.id}
              btn1={'unfollow'}
              btn2={'chat'}
              user={user}
            />
          ))}
    </StyledPostsBox>
  )
}

export default Followers