import React, { useState } from 'react';
import propic from '../../images/propic.jpg'
import NavIcon from './NavIcon';

import { Avatar, MenuItem, Menu, } from '../../imports/materialuiComponents';
import {
    NotificationsIcon, LoginIcon, LogoutIcon
} from '../../imports/materialIcons';
import { useNavigate } from 'react-router';


const MobileMoreMenu = ({
    openMobileMenu, setOpenMobileMenu, authData,
    anchorEl, handleClose, handleClick, notification,
}) => {
    const navigate = useNavigate()


    return (
        <Menu
            // disableScrollLock={true}
            id='mobileMoreMenu'
            anchorEl={anchorEl}
            open={openMobileMenu}
            onClose={() => handleClose('mobileMoreClose')}
            sx={{ marginTop: '30px' }}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >

            <MenuItem onClick={(e) => handleClick('noti', e)}>
                <NavIcon icon={<NotificationsIcon />} badgeContent={notification?.length} />
                Notifications
            </MenuItem>
            <MenuItem onClick={() => { navigate('/profile') }}>
                <NavIcon
                    icon={<Avatar src={propic} sx={{ width: 30, height: 30 }} />}
                />
                Profile
            </MenuItem>

            {
                authData
                    ? (<MenuItem onClick={() => handleClick('logout')}>
                        <NavIcon icon={<LoginIcon src={propic} sx={{ width: 30, height: 30 }} />} />
                        Logout
                    </MenuItem>

                    ) : (
                        <MenuItem onClick={() => handleClick('login')}>
                            <NavIcon icon={<LogoutIcon src={propic} sx={{ width: 30, height: 30 }} />} />
                            Login
                        </MenuItem>
                    )
            }


        </Menu >
    )
}



export default MobileMoreMenu