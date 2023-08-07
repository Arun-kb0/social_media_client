import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { follow, unFollow } from '../../redux/features/user/userActions'
import { useNavigate } from 'react-router-dom'
import { StyledUserPaper } from './styles'

import {
    orange, Avatar, Button, Typography, Box, Badge
} from '../../imports/materialuiComponents'


const Person = ({ btn1, btn2, user }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { username, photo } = useSelector(state => state.auth)
    const [btn1State, setbtn1State] = useState(btn1)


    const handleClick = (type) => {
        switch (type) {
            case 'follow':
                console.log("follow")
                dispatch(follow({
                    ownerName: username,
                    ownerPhoto: photo,
                    followUserId: user.id,
                    name: user.name,
                    photo: user?.picture,
                }))
                setbtn1State('unfollow')
                return;
            case 'remove':
                console.log("remove")

                return;
            case 'unfollow':
                console.log("unfollow")
                dispatch(unFollow(user.id))
                setbtn1State('follow')

                return;
            case 'chat':
                console.log("chat")
                
                navigate('/chat')
                return;

            default:
                return;
        }
    }

    return (
        <StyledUserPaper elevation={6}>
            <Box sx={{ width: "27%" }}>
                {user.picture
                    ? (
                        <Badge badgeContent='' color='success' overlap="circular" >
                            <Avatar src={user.picture} alt='' sx={{ width: 75, height: 75 }} />
                        </Badge>
                    ) : (
                        <Badge badgeContent='' color='success' overlap="circular" invisible={user.isOnline ? false : true}  >
                            <Avatar src='' alt='' sx={{ width: 75, height: 75, bgcolor: orange[800] }} >
                                <Typography variant='h4' >{user.name[0]}</Typography>
                            </Avatar>
                        </Badge>
                    )
                }

            </Box>
            <Box paddingLeft={0.5} >
                <Typography padding={1} >{user.name}</Typography>
                <Button
                    variant='contained'
                    sx={{ marginRight: 1 }}
                    onClick={() => handleClick(btn1State)}
                >
                    {btn1State}
                </Button>
                <Button
                    variant='contained'
                    sx={{ marginRight: 1 }}
                    onClick={() => handleClick(btn2)}
                >
                    {btn2}
                </Button>
            </Box>
        </StyledUserPaper>
    )
}

export default Person