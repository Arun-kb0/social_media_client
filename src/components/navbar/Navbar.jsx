import React, { useEffect, useMemo, useState } from 'react'
import {
  AppBar, Typography, Avatar, MenuItem, Menu, Fade, Box, Button, MenuList, Paper,
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
import { useDispatch, useSelector } from 'react-redux';
import { corsOptions } from '../../../../server/config/corsOptions';
import { getAllNotifications,ReciveNotifications } from '../../redux/features/user/userActions';



const Navbar = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [openMobileMenu, setOpenMobileMenu] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const [notificationMenuOpen, setNotificationMenuOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)


  const { isOnline, photo } = useSelector(state => state.auth)
  const { socket } = useSelector(state => state.socketioReducer)
  const { notification } = useSelector(state => state.user)


  const handleDrawer = () => {
    setDrawerOpen(prev => !prev)
    localStorage.setItem("drawerOpen", drawerOpen)
  }

  useEffect(()=>{
    dispatch(getAllNotifications())
  },[])


  useEffect(() => {
    if (socket) {
      const cleanup = dispatch(ReciveNotifications())
      return () => dispatch(cleanup)
    }
  }, [socket])


  const handleClick = (type, e) => {
    switch (type) {
      case 'noti':
        setAnchorEl(e.currentTarget);
        setNotificationMenuOpen(true)
        return;
      case 'more':
        setAnchorEl(e.currentTarget)
        setOpen(true)
        return

      default:
        return;
    }
    // setAnchorEl(e.currentTarget);
    // setNotificationMenuOpen(true)
  };

  const handleClose = (type) => {
    switch (type) {
      case 'noti':
        setAnchorEl(null);
        setNotificationMenuOpen(false)
        return;
      case 'more':
        setOpen(false)
        setAnchorEl(null)
        return

      default:
        return;
    }

  };



  return (
    <Box sx={{ flexGrow: 1 }}    >
      <AppBar
        //  position='static'
        sx={{ position: 'fixed', right: 0, top: 0, left: 0, backgroundColor: 'white' }}
        sName="mui-fixed"
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
            <NavIcon
              icon={
                <NotificationsIcon
                  // onClick={() => setNotificationMenuOpen(prev => !prev)}
                  onClick={(e) => handleClick('noti', e)}
                />
              }
              badgeContent={notification ? notification.length : null}
            />
            <NavIcon icon={
              <Avatar
                src={photo ? photo : ''}
                sx={{ width: 30, height: 30 }}
                // onClick={() => { setOpen(prev => !prev) }}
                onClick={(e) => handleClick('more', e)}
              />}
              badgeContent={''}
              variant={'dot'}
              isOnline={isOnline}
              overlap={'circular'}
            />
          </Icons>

          <UserBox>
            <NavIcon icon={<MoreIcon onClick={(() => { setOpenMobileMenu(prev => !prev) })} />} />
          </UserBox>
        </StyledToolbar>

        {/* user buttons */}
        <Menu
          // disableScrollLock={true}
          id="fade-menu"
          MenuListProps={{ 'aria-labelledby': 'fade-button', }}
          open={open}
          onClose={() => handleClose('more')}
          TransitionComponent={Fade}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          marginThreshold={50}
        >
          <MenuItem onClick={() => { }}>Profile</MenuItem>
          <MenuItem onClick={() => { }}>My account</MenuItem>
          <MenuItem onClick={() => { }}>Logout</MenuItem>
        </Menu>

        <NotificationMenu
          open={notificationMenuOpen}
          notification={notification}
          anchorEl={anchorEl}
          handleClose={handleClose}
          handleClick={handleClick}
        />

        <MobileMenu
          openMobileMenu={openMobileMenu}
          setOpenMobileMenu={setOpenMobileMenu}
        />

      </AppBar>
    </Box>
  )
}


const NotificationMenu = ({ open, notification, anchorEl, handleClose }) => {

  return (
    <Menu
      id="notificationMenu"
      MenuListProps={{ 'aria-labelledby': 'fade-button', }}
      PaperProps={{
        style: {
          maxHeight: 200,
          // width: '35ch',
        },
      }}

      anchorEl={anchorEl}
      open={open}
      onClose={() => handleClose('noti')}
      TransitionComponent={Fade}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      marginThreshold={62}
    >

      {notification && <Button variant='contained' size='small'sx={{marginLeft:1}}>Clear</Button>}
      {notification
        ? notification.map((data) => (
          <MenuItem key={data._id}>
            {`${data.likedUserName} ${data.actionType} your post`}
          </MenuItem>
        ))
        : <MenuItem>No new notifications</MenuItem>
      }

    </Menu>

  )
}


export default Navbar