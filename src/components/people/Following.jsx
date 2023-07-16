import React, { useEffect, useState } from 'react'
import Person from './Person'
import { StyledPostsBox } from '../posts/styles'
import { useDispatch, useSelector } from 'react-redux'
import { getFollowing } from '../../redux/features/user/userActions'

const Following = () => {
    const dispatch = useDispatch()
    const { following } = useSelector(state => state.user)
    const [followingList, setfollowingList] = useState(null)
    const [isCancelled, setIsCancelled] = useState(false)

    useEffect(() => {
        if (!isCancelled) {
            dispatch(getFollowing())
        }
        return () => {
            setIsCancelled(true)
        }
    }, [])




    return (
        <StyledPostsBox >
            {following?.map((user) => (
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

export default Following