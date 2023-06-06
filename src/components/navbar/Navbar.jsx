import React, { useState } from 'react'
import {
  AppBar, Typography, Avatar, MenuItem, Menu, Fade, Box, Button,
} from '@mui/material'
import {
  Search, StyledToolbar, Icons, UserBox, SearchIconWrapper,
  StyledInputBase, StyledIconButton
} from './styles';
import { blueGrey } from '@mui/material/colors';

import propic from '../../images/propic.jpg'
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import InterestsIcon from '@mui/icons-material/Interests';
import MoreIcon from '@mui/icons-material/MoreVert';

import { Link } from 'react-router-dom'

import MobileMenu from './MobileMenu';
import NavIcon from './NavIcon';



const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [openMobileMenu, setOpenMobileMenu] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleDrawer = () => {
    setDrawerOpen(prev => !prev)
    localStorage.setItem("drawerOpen", drawerOpen)
  }

  return (
    <Box sx={{ flexGrow: 1 }}    >
      <AppBar
        //  position='static'
        sx={{ position: 'fixed', right: 0, top: 0, left: 0, backgroundColor:'white' }}
        className="mui-fixed"
      >

        <StyledToolbar>
          <UserBox>
            <StyledIconButton onClick={handleDrawer}>
              <MenuIcon />
            </StyledIconButton>
          </UserBox>

          <Button
            variant='text'
            LinkComponent={Link}
            to='/'
            sx={{ padding: '0px' }}
          >
            <Typography
              variant='h6'
              color={blueGrey[700]}
              // noWrap
              // component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              Social Media
            </Typography>
            <InterestsIcon sx={{ display: { xs: 'block', sm: 'none' }, padding: '15px', color: blueGrey[50] }} />
          </Button>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder='Search...' />
          </Search>

          <Icons>
            <NavIcon icon={<MailIcon />} badgeContent={4} />
            <NavIcon icon={<NotificationsIcon />} badgeContent={4} />
            <NavIcon icon={
              <Avatar
                src={propic}
                sx={{ width: 30, height: 30 }}
                onClick={(() => { setOpen(prev => !prev) })}
              />}
            />
          </Icons>

          <UserBox>
            <NavIcon icon={<MoreIcon onClick={(() => { setOpenMobileMenu(prev => !prev) })} />} />
          </UserBox>
        </StyledToolbar>


        <Menu
          // disableScrollLock={true}
          id="fade-menu"
          MenuListProps={{
            'aria-labelledby': 'fade-button',
          }}
          open={open}
          onClose={() => { setOpen(!open) }}
          TransitionComponent={Fade}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          marginThreshold={50}
        >
          <MenuItem onClick={() => { }}>Profile</MenuItem>
          <MenuItem onClick={() => { }}>My account</MenuItem>
          <MenuItem onClick={() => { }}>Logout</MenuItem>
        </Menu>


        <MobileMenu
          openMobileMenu={openMobileMenu}
          setOpenMobileMenu={setOpenMobileMenu}
        />

      </AppBar>
    </Box>
  )
}



export default Navbar