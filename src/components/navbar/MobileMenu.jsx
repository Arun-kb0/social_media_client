import React, { useState } from 'react';
import {
    AppBar, Typography, Badge, Avatar, MenuItem, Menu, Fade, Box,
    IconButton, Toolbar,
} from '@mui/material'
import propic from '../../images/propic.jpg'

import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NavIcon from './NavIcon';


const MobileMenu = ({ openMobileMenu, setOpenMobileMenu }) => {
    const [userMenuOpen, setUserMenuOpen] = useState(false)

    const handleMenuClose = () => {
        setOpenMobileMenu((prev) => !prev)
    }
    const handleUserMenu = () => {
        setUserMenuOpen(prev => !prev)
    }

    
    return (
        <Menu
            // anchorEl={mobileMoreAnchorEl}
            sx={{ marginTop: '30px' }}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            // id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={openMobileMenu}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>
                <NavIcon icon={<MailIcon />} badgeContent={4} />
                <p>Messages</p>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
                <NavIcon icon={<NotificationsIcon />} badgeContent={4} />
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleUserMenu}>
                <NavIcon
                    icon={<Avatar src={propic} sx={{ width: 30, height: 30 }} />}
                />
                <p>Profile</p>
            </MenuItem>

                <MobileUserMenu
                    setUserMenuOpen={setUserMenuOpen}
                    userMenuOpen={userMenuOpen}
                />
        </Menu>
    )
}

const MobileUserMenu = ({ setUserMenuOpen, userMenuOpen }) => {
    const handleMenuClose = () => {
        setUserMenuOpen(false)
    }
    return (
        <Menu
            // anchorEl={anchorEl}
            sx={{ marginTop: '230px' }}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            // id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={userMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </Menu>
    )
}


export default MobileMenu