import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import UserPosts from './UserPosts'
import { getUserPosted } from '../../redux/features/post/postActions'
import { ButtonDivider, ProfileButtons, StyledBox, StyledBoxContainer } from './styles'

import { Avatar, Badge, Box, IconButton, Typography, deepOrange, grey } from '../../imports/materialuiComponents'
import { getFollowers, getFollowing } from '../../redux/features/user/userActions'
import Following from '../people/Following'
import Followers from '../people/Followers'
import { EditTwoToneIcon } from '../../imports/materialIcons'



const UserProfile = () => {
    const dispatch = useDispatch()
    const [openComponent, setOpenComponent] = useState(false)
    const [open, setOpen] = useState({
        create: false,
        followers: false,
        following: false,
    })
    const { username, email, photo, isOnline } = useSelector(state => state.auth)
    const { following, followers } = useSelector(state => state.user)
    const { userPosts } = useSelector(state => state.post)

    const handleClick = (type) => {
        switch (type) {
            case 'created':
                !open.create && dispatch(getUserPosted())
                open.create
                    ? setOpenComponent(false)
                    : setOpenComponent(true)
                setOpen({
                    create: true,
                    followers: false,
                    following: false,
                })
                return;
            case 'followers':
                open.followers
                    ? setOpenComponent(false)
                    : setOpenComponent(true)
                setOpen({
                    create: false,
                    followers: true,
                    following: false,
                })
                return;
            case 'following':
                open.following
                    ? setOpenComponent(false)
                    : setOpenComponent(true)
                setOpen({
                    create: false,
                    followers: false,
                    following: true,
                })
                return;
           

            default:
                return
        }
    }



    useEffect(() => {
        if (openComponent === false) {
            setOpen({
                create: false,
                followers: false,
                following: false,
            })
        }
    }, [openComponent])


    useEffect(() => {
        dispatch(getFollowing())
        dispatch(getFollowers())
        dispatch(getUserPosted())
    }, [])



    return (
        <Box bgcolor={''}
            sx={{ position: 'fixed', right: 0, top: 80, left: 0 }}
            className="mui-fixed"
        >

            <StyledBox>
                <StyledBoxContainer>
                    {!openComponent &&
                        <>
                            <StyledBox>
                                {photo
                                    ? (<Badge badgeContent='' color='success' overlap="circular" invisible={isOnline ? false : true}  >
                                        <Avatar src={photo} alt='' sx={{ width: 100, height: 100 }} />
                                    </Badge>)
                                    : (<Badge badgeContent='' color='success' overlap="circular" >
                                        <Avatar sx={{ bgcolor: deepOrange[500], height: 100, width: 100 }} >
                                            <Typography variant="h2" color="initial">{username[0]}</Typography>
                                        </Avatar>
                                    </Badge>)
                                }
                            </StyledBox>
                            <StyledBox>
                                <Typography variant='h3' sx={{ paddingTop: 3, fontWeight: 70 }}>
                                    {username}
                                </Typography>
                            </StyledBox>

                            <StyledBox>
                                <Typography variant='body1'>{`email : ${email}`}</Typography>
                            </StyledBox>
                        </>
                    }
                    <StyledBox>
                        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', paddingTop: 2, width: '100%' }}>
                            <ProfileButtons
                                sx={{
                                    backgroundColor: openComponent && open.create && grey[700],
                                    color: openComponent && open.create && grey[100],
                                }}
                                variant='contained'
                                size='medium'
                                onClick={() => { handleClick('created') }}
                            >
                                {`${userPosts?.length} Created`}
                            </ProfileButtons>
                            <ProfileButtons
                                sx={{
                                    backgroundColor: openComponent && open.followers && grey[700],
                                    color: openComponent && open.followers && grey[100],
                                }}
                                variant='contained'
                                size='medium'
                                onClick={() => { handleClick('followers') }}
                            >
                                {`${followers?.length} followers`}
                            </ProfileButtons>
                            <ProfileButtons
                                sx={{
                                    backgroundColor: openComponent && open.following && grey[700],
                                    color: openComponent && open.following && grey[100],
                                }}
                                variant='contained'
                                size='medium'
                                onClick={() => { handleClick('following') }}
                            >
                                {`${following?.length} following`}
                            </ProfileButtons>
                        </Box>
                    </StyledBox>



                    <Box sx={{ display: 'flex', justifyContent: 'center', padding: 1 }}>
                        <ButtonDivider
                            variant='middle'
                            component='div'
                        />
                    </Box>


                    {openComponent && open.create &&
                        <StyledBox>
                            <UserPosts />
                        </StyledBox>
                    }

                    {openComponent && open.followers &&
                        <StyledBox>
                            <Followers isReqestSend={true} />
                        </StyledBox>
                    }

                    {openComponent && open.following &&
                        <StyledBox>
                            <Following isReqestSend={true} />
                        </StyledBox>
                    }

                </StyledBoxContainer>
            </StyledBox >
        </Box >
    )
}

export default UserProfile