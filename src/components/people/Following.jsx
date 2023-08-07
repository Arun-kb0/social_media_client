import React, { useEffect, useState } from 'react'

import Person from './Person'
import { StyledPostsBox } from '../posts/styles'
import { useDispatch, useSelector } from 'react-redux'
import { getFollowing } from '../../redux/features/user/userActions'
import { Typography } from '../../imports/materialuiComponents'


const Following = ({ isReqestSend=false }) => {
    const dispatch = useDispatch()
    const { following } = useSelector(state => state.user)
    const [isCancelled, setIsCancelled] = useState(false)

    useEffect(() => {
        if (!isCancelled && !isReqestSend) {
            console.log("following component req send ")
            dispatch(getFollowing())
        }
        return () => {
            setIsCancelled(true)
        }
    }, [])



    return (
        <StyledPostsBox >

            {following?.length === 0
                ? <Typography variant='h6'>Youre not following anyone</Typography>
                : following?.map((user) => (
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