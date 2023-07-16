import { Avatar, Button, Typography, Box, Badge } from '@mui/material'
import React from 'react'
import { StyledUserPaper } from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { follow } from '../../redux/features/user/userActions'
import { deepOrange, orange } from '@mui/material/colors'


const Person = ({ btn1, btn2, user }) => {
    const dispatch = useDispatch()
    const { username } = useSelector(state => state.auth)

    const handleRemove = () => {
        // dispatch(follow())

    }

    const handleFollow = () => {
        dispatch(follow({
            ownerName: username,
            followUserId: user.id,
            name: user.name,
            photo: user?.picture,
        }))
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
                        <Badge badgeContent='' color='success' overlap="circular"  invisible={user.isOnline ? false : true}  >
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
                    onClick={handleFollow}
                >
                    {btn1}
                </Button>
                <Button
                    variant='contained'
                    sx={{ marginRight: 1 }}
                    onClick={handleRemove}
                >
                    {btn2}
                </Button>
            </Box>
        </StyledUserPaper>
    )
}

export default Person