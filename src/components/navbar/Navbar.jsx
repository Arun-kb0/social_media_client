import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import MobileMenu from './MobileMenu';
import { getAllNotifications, ReciveNotifications, removeAllNotifications, removeNotification } from '../../redux/features/user/userActions';
import { mongodbRelemConnect, searchPost } from '../../redux/features/post/postActions';
import { SET_SEARCH_OPEN } from '../../constants/actionTypes';
import {
  Search, StyledToolbar, Icons, UserBox, SearchIconWrapper,
  StyledInputBase, StyledIconButton, StyledStack, StyledPaper
} from './styles';
import NavIcon from './NavIcon';

import {
  blueGrey, AppBar, Typography, Avatar, MenuItem, Menu,
  Fade, Box, Button, MenuList,
} from '../../imports/materialuiComponents';
import {
  SearchIcon, NotificationsIcon, MailIcon, MenuIcon,
  InterestsIcon, MoreIcon
} from '../../imports/materialIcons';
import { logout } from '../../redux/features/auth/authActions';
import { clearChatState } from '../../redux/features/chat/chatActions';


const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [openMobileMenu, setOpenMobileMenu] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const [searchInput, setSearchInput] = useState('')
  const [autoComplete, setAutoComplete] = useState([])

  const [notificationMenuOpen, setNotificationMenuOpen] = useState(false)
  const [autoCompleteOpen, setAutoCompleteOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)


  const { isOnline, photo, authData } = useSelector(state => state.auth)
  const { socket } = useSelector(state => state.socketioReducer)
  const { notification } = useSelector(state => state.user)
  const { mongodbRelam } = useSelector(state => state.post)


  const handleDrawer = () => {
    setDrawerOpen(prev => !prev)
    localStorage.setItem("drawerOpen", drawerOpen)
  }

  useEffect(() => {
    dispatch(getAllNotifications())
    dispatch(mongodbRelemConnect())

  }, [])


  useEffect(() => {
    if (socket) {
      const cleanup = dispatch(ReciveNotifications())
      return () => dispatch(cleanup)
    }
  }, [socket])


  useEffect(() => {
    const search = async () => {
      try {
        const searchAutoComplete = await mongodbRelam?.functions.searchAutoComplete(searchInput)
        console.warn("relam")
        console.log(searchAutoComplete)
        setAutoComplete(() => searchAutoComplete)
      } catch (error) {
        console.log(error)
      }
    }

    if (searchInput.length)
      search()
    else
      setAutoComplete([])
  }, [searchInput])



  const handleClick = (type, e, data) => {
    switch (type) {
      case 'noti':
        setAnchorEl(e.currentTarget);
        setNotificationMenuOpen(true)
        return;
      case 'more':
        setAnchorEl(e.currentTarget)
        setOpen(true)
        return
      case 'logout':
        dispatch(clearChatState())
        dispatch(logout())
        return
      case 'clearAllNoti':
        dispatch(removeAllNotifications())
        return
      case 'clearNoti':
        console.log(data)
        dispatch(removeNotification(data._id, 'liked'))
        return

      // * search
      case 'search':
        if (searchInput.length > 0) {
          console.log(searchInput)
          // relamSearch()
          dispatch(searchPost(searchInput))
          dispatch({ type: SET_SEARCH_OPEN, payload: true })
          setSearchInput('')
          setAutoCompleteOpen(false)
        }
        return

      case 'autoComp':
        setAutoCompleteOpen(true)
        setAnchorEl(e.currentTarget)
        return

      case 'changeVal':
        console.log(data)
        setSearchInput(data)
        return


      default:
        return;
    }
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
      case 'autoComp':
        setAutoCompleteOpen(false)
        return

      default:
        return;
    }

  };


  const handleKey = (e) => {
    if (e.key === 'Enter')
      handleClick('search')
  }

  const handleInputChange = (e) => {
    setSearchInput(e.target.value)
    if (e.target.value.length > 0) {
      setAutoCompleteOpen(true)
    } else {
      setAutoCompleteOpen(false)
    }
    console.log("autoCompleteOpen", autoCompleteOpen)
  }



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
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              Social Media
            </Typography>
            <InterestsIcon sx={{ display: { xs: 'block', sm: 'none' }, padding: '15px', color: blueGrey[50] }} />
          </Button>

          <Search >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>

            <StyledInputBase
              placeholder='Search...'
              onChange={handleInputChange}
              onKeyDown={handleKey}
              value={searchInput}
            />
          </Search>
          {autoCompleteOpen &&
            <AutoComplete
              handleClick={handleClick}
              autoComplete={autoComplete}
            />
          }

          <Icons>
            <NavIcon
              icon={
                <NotificationsIcon
                  onClick={(e) => handleClick('noti', e)}
                />
              }
              badgeContent={notification ? notification.length : null}
            />
            <NavIcon icon={
              <Avatar
                src={photo ? photo : ''}
                sx={{ width: 30, height: 30 }}
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

          <MenuItem onClick={() => { navigate('/profile') }}>Profile</MenuItem>
          {authData
            ? <MenuItem onClick={() => handleClick('logout')}>Logout</MenuItem>
            : <MenuItem onClick={() => handleClick(navigate('/auth'))}>Login</MenuItem>
          }
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
    </Box >
  )
}


const NotificationMenu = ({ open, notification, anchorEl, handleClose, handleClick }) => {

  return (
    <Menu
      id="notificationMenu"
      MenuListProps={{ 'aria-labelledby': 'fade-button', }}
      PaperProps={{
        style: {
          maxHeight: 400,
          width: '30ch',
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

      {notification &&
        <Button variant='contained' size='small' sx={{ marginLeft: 1 }}
          onClick={() => handleClick('clearAllNoti')}
        >
          Clear
        </Button>
      }
      {notification
        ? notification.map((data) => (
          <MenuItem key={data._id} onClick={(e) => handleClick('clearNoti', e, data)}>
            {data?.actionType === 'liked'
              ? `${data.likedUserName} ${data?.actionType} your post`
              : `${data.likedUserName} ${data?.actionType} on your post`
            }

          </MenuItem>
        ))
        : <MenuItem>No new notifications</MenuItem>
      }

    </Menu>

  )
}



const AutoComplete = ({ handleClick, autoComplete }) => {

  return (

    <StyledStack direction={'row'} spacing={2} >
      <StyledPaper>
        <MenuList >
          {autoComplete?.map(data => (
            <MenuItem
              onClick={(e) => handleClick('changeVal', e, data.title)}
            >
              {data.title}
            </MenuItem>
          ))}
        </MenuList>
      </StyledPaper>
    </StyledStack>


  )
}


export default Navbar