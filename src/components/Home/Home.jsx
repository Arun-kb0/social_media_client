import React from 'react'
import { Stack, Fab, Tooltip } from '@mui/material'
import LeftSidebar from '../leftSidebar/LeftSidebar'
import RightSidebar from '../rightSidebar/RightSidebar'
import Posts from '../posts/posts'
import Drawer from '../leftSidebar/Drawer'
import AddIcon from '@mui/icons-material/Add';


const Home = () => {

    return (
        <div>
            <Stack
                direction='row'
                spacing={2}
                justifyContent='space-between'
                sx={{ overflowY: 'scroll', maxHeight: '100vh' }}
            >
                <LeftSidebar />
                <Drawer />
                <Posts />

                <RightSidebar />
                <Tooltip
                    title="add"
                    sx={{
                        position: 'fixed', bottom: 20,
                        left: { xs: 'calc(50% - 12px)', md: '30px' },
                    }}
                    onClick={() => { }}
                >
                    <Fab color="primary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </Tooltip>
            </Stack>
        </div>
    )
}

export default Home