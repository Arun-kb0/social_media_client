import { Avatar, Badge, Box, Button, Divider, Typography } from '@mui/material'
import { deepOrange, grey, red } from '@mui/material/colors'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ButtonDivider, ProfileButtons, StyledBox } from './styles'
import { getUserPosted } from '../../redux/features/post/postActions'
import UserPosts from './UserPosts'


const UserProfile = () => {
    const [open, setOpen] = useState(false)
    const { username } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const handleClick = (type) => {
        switch (type) {
            case 'created':
                !open && dispatch(getUserPosted())
                setOpen(!open)
                break;
            case 'saved':

                break;
            default:
                break;
        }
    }
    return (
        <Box bgcolor={''}
            sx={{ position: 'fixed', right: 0, top: 80, left: 0 }}
            className="mui-fixed"
        >

            <StyledBox>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
                    {!open &&
                        <>
                            <StyledBox>
                                {/* <Avatar sizes='320' alt='img' src=''/> */}
                                <Badge badgeContent='' color='success' overlap="circular" >
                                    <Avatar sx={{ bgcolor: deepOrange[500], height: 100, width: 100 }} >
                                        <Typography variant="h2" color="initial">{username[0]}</Typography>
                                    </Avatar>
                                </Badge>

                            </StyledBox>

                            <StyledBox>
                                <Typography variant='h3'
                                    sx={{ paddingTop: 3, fontWeight: 70 }}
                                >{username}
                                </Typography>
                            </StyledBox>

                            <StyledBox>
                                <Typography variant='body1'>email</Typography>
                            </StyledBox>

                            <StyledBox sx={{ padding: 1 }}>
                                <Typography variant='body1'>discription</Typography>
                            </StyledBox>

                            <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
                                <Typography variant='h6' sx={{ paddingRight: 5 }} >followers</Typography>
                                <Typography variant='h6'>following</Typography>
                            </Box>
                        </>
                    }
                    
                    <StyledBox>
                        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', paddingTop: 2, width: '70%' }}>
                            <ProfileButtons
                                variant='contained'
                                size='large'
                                onClick={() => { handleClick('created') }}
                            >
                                Created
                            </ProfileButtons>
                            <ProfileButtons
                                variant='contained'
                                size='large'
                                onClick={() => { handleClick('saved') }}
                            >
                                Saved
                            </ProfileButtons>
                        </Box>
                    </StyledBox>



                    <Box sx={{ display: 'flex', justifyContent: 'center', padding: 1 }}>
                        <ButtonDivider
                            variant='middle'
                            component='div'
                        />
                    </Box>

                    {open && <StyledBox sx={{}}>
                        <UserPosts />
                    </StyledBox>}
                </Box>


            </StyledBox>
        </Box>
    )
}

export default UserProfile