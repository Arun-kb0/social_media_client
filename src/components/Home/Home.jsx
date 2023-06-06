import React from 'react'
import { Stack, Fab, Tooltip, Container, Box } from '@mui/material'
import LeftSidebar from '../leftSidebar/LeftSidebar'
import RightSidebar from '../rightSidebar/RightSidebar'
import Posts from '../posts/posts'
import Drawer from '../leftSidebar/Drawer'
import AddIcon from '@mui/icons-material/Add';
import { grey } from '@mui/material/colors'

const Home = () => {

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
                sx={{ overflowY: 'scroll', maxHeight: '100vh', }}

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
        </Box>
    )
}

export default Home