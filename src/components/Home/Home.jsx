import React, { useEffect } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import LeftSidebar from '../leftSidebar/LeftSidebar'
import RightSidebar from '../rightSidebar/RightSidebar'
import Posts from '../posts/posts'
import Drawer from '../leftSidebar/Drawer'
import ViewSearch from '../viewSearch/ViewSearch'
import Following from '../people/Following'
import FindPeople from '../people/FindPeople'

import { Stack, Fab, Tooltip, Box, grey } from '../../imports/materialuiComponents'
import { AddIcon } from '../../imports/materialIcons'



const Home = () => {
    const navigate = useNavigate()
    const { isFindPeopleOpen, isPostsOpen, isFollowOpen, isSearchOpen } = useSelector(state => state.buttonToggle)
    const { posts, currentPage, numberOfPages, postIds, likedPostIds } = useSelector(state => state.post)
    const { socket } = useSelector(state => state?.scoketioReducer || {})
    const { authData } = useSelector(state => state?.auth)

    useEffect(() => {
        const setIsOnline = (data) => {
            console.warn("socket is online", data)
        }
        if (socket) {
            socket.on("setIsOnline", setIsOnline)
            return () => socket.off("setIsOnline", setIsOnline)
        }
    }, [socket])
    

    return (
        <Box
            sx={{ position: 'fixed', right: 0, top: 65, left: 0 }}
            className="mui-fixed"
        >
            <Stack
                direction='row'
                spacing={2}
                justifyContent='space-between'
                bgcolor={grey[300]}
                sx={{ overflowY: 'scroll', maxHeight: '100vh', height: '100vh' }}

            >
                <LeftSidebar />
                <Drawer />
                {isPostsOpen &&
                    <Posts
                        posts={posts}
                        currentPage={currentPage}
                        numberOfPages={numberOfPages}
                        postIds={postIds}
                        likedPostIds={likedPostIds}
                    />}
                {isSearchOpen && <ViewSearch />}
                {isFindPeopleOpen && (authData ? <FindPeople /> : <Navigate to='/auth'/> )}
                {isFollowOpen && (authData ?  <Following /> : <Navigate to="/auth"/>)}
                <RightSidebar />


                <Tooltip
                    title="add post"
                    // popper
                    sx={{
                        position: 'fixed',
                        bottom: 20,
                        left: { xs: 'calc(50% - 12px)', md: '30px' },
                    }}
                    onClick={() => { navigate('/create') }}
                >
                    <Fab color="primary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </Tooltip>
            </Stack>
        </Box>
    )
}

export default Home