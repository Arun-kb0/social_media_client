import { IconButton, Typography, SwipeableDrawer, List } from '@mui/material'
import React, { useState } from 'react'
import ListIconTemplate from './ListIconTemplate'
import HomeIcon from '@mui/icons-material/Home';



const Drawer = () => {
    const [open, setOpen] = useState(true)
    const tmp = localStorage.getItem('openDrawer')
    console.log(tmp)

    return (
        <SwipeableDrawer
            // disableScrollLock={true} //remove body right sidespace 
            sx={{ display: { xs: 'flex', sm: 'none' } }}
            // anchor={anchor}
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
        >
            <List>
                <ListIconTemplate icon={<HomeIcon />} text={'home'} />
                <ListIconTemplate icon={<HomeIcon />} text={'home'} />
                <ListIconTemplate icon={<HomeIcon />} text={'home'} />
                <ListIconTemplate icon={<HomeIcon />} text={'home'} />
            </List>

        </SwipeableDrawer>
    )
}

export default Drawer