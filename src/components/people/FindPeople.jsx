import React, { Fragment, useEffect, useState } from 'react'
import Person from './Person'
import { StyledPostsBox } from '../posts/styles'
import { Waypoint } from 'react-waypoint'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from '@mui/material'
import { getUsers } from '../../redux/features/user/userActions'

const FindPeople = () => {
    const [page, setPage] = useState(1)
    const [isCancelled, setIsCancelled] = useState(false)
    const dispatch = useDispatch()
    const { allUsers: { users, currentPage, numberOfPages } } = useSelector(state => state.user)

    useEffect(() => {
        if (!isCancelled) {
            console.log('FindPeople getusers called ' + page)
            dispatch(getUsers(page))
        }
    }, [page])




    const handlePage = () => {
        if (page < numberOfPages) {
            setPage(prev => prev + 1)
            console.log(page)
        } else {
            setIsCancelled(true)
        }
    }

    return (
        <StyledPostsBox >
            {users.map((user, index) => (
                <Fragment key={user.id}>
                    <Person
                        btn1={'follow'} btn2={'remove'}
                        user={user}
                    />
                    {index === users.length - 4 &&
                        <Waypoint onPositionChange={handlePage} />
                    }
                </Fragment>
            ))}
            <Box sx={{paddingTop:10}}></Box>
        </StyledPostsBox>
    )
}

export default FindPeople