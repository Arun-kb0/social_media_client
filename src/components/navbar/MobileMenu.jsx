import React, { useState } from 'react';
import propic from '../../images/propic.jpg'
import NavIcon from './NavIcon';

import { Avatar, MenuItem, Menu, } from '../../imports/materialuiComponents';
import {MailIcon,NotificationsIcon} from '../../imports/materialIcons';
 

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
            // disableScrollLock={true}
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
            disableScrollLock={true}
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