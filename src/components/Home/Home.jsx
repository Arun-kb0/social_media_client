import React, { useEffect } from 'react'
import { Stack, Fab, Tooltip, Container, Box } from '@mui/material'
import LeftSidebar from '../leftSidebar/LeftSidebar'
import RightSidebar from '../rightSidebar/RightSidebar'
import Posts from '../posts/posts'
import Drawer from '../leftSidebar/Drawer'
import AddIcon from '@mui/icons-material/Add';
import { grey } from '@mui/material/colors'
import { useNavigate } from 'react-router-dom'
import FindPeople from '../people/FindPeople'
import { useDispatch, useSelector } from 'react-redux'
import Following from '../people/Following'
import { socketConnect, socketDisConnect } from '../../redux/features/socketio/socketioActions'

const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isFindPeopleOpen, isPostsOpen,isFollowOpen } = useSelector(state => state.buttonToggle)


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
                {isPostsOpen && <Posts />}
                {isFindPeopleOpen && <FindPeople />}
                {isFollowOpen && <Following/>}
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