import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import ListIconTemplate from './ListIconTemplate'
import { SET_FIND_PEOPLE_OPEN, SET_FOLLOWING_OPEN, SET_MOBILE_DRAWER_OPEN, SET_POSTS_OPEN } from '../../constants/actionTypes';
import { clearChatState } from '../../redux/features/chat/chatActions';
import { logout } from '../../redux/features/auth/authActions';

import { SwipeableDrawer,List, Divider, blue } from '../../imports/materialuiComponents'
import {
    HomeIcon, LoginIcon, LogoutIcon, GroupIcon,
    Diversity2Icon, TextsmsIcon, AddIcon, PersonIcon
} from '../../imports/materialIcons';


const Drawer = () => {
    const dispatch = useDispatch()
    const { authData } = useSelector(state => state.auth)
    const { isFindPeopleOpen, isPostsOpen, isFollowOpen } = useSelector(state => state.buttonToggle)
    const { totalMessageCount } = useSelector(state => state.user)
    const { isMobileDrawerOpen } = useSelector(state=> state.buttonToggle)
   

    const handleClick = ({type}) => {
        switch (type) {
            case 'openDrawer':
                dispatch({ type: SET_MOBILE_DRAWER_OPEN, payload: true })
                return 
            case 'closeDrawer':
                dispatch({ type: SET_MOBILE_DRAWER_OPEN, payload: false })
                return 
            
            case 'home':
                dispatch({ type: SET_POSTS_OPEN, payload: true })
                console.log("home")
                return
            case 'people':
                dispatch({ type: SET_FIND_PEOPLE_OPEN, payload: true })
                console.log("people")
                return;
            case 'follow':
                dispatch({ type: SET_FOLLOWING_OPEN, payload: true })
                console.log("follow")
                return;

            case 'logout':
                dispatch(clearChatState())
                dispatch(logout())
                return;

            default:
                return;
        }
    }

    
    return (
        <SwipeableDrawer
            // disableScrollLock={true} //remove body right sidespace 
            // anchor={anchor}
            sx={{ display: { xs: 'flex', sm: 'none' } }}
            open={isMobileDrawerOpen}
            onClose={() => handleClick({type:'closeDrawer'})}
            onOpen={() => handleClick({type:'openDrawer'})}
        >

            <List component='div' >
                <ListIconTemplate icon={<HomeIcon sx={{ fontSize: '32px', color: isPostsOpen && blue[700] }} />} text={'Home'} onClick={() => handleClick({ type: 'home' })} />
                <ListIconTemplate icon={<AddIcon sx={{ fontSize: '32px' }} />} text={'Add Post'} linkTo={'/create'} />
                <ListIconTemplate icon={<GroupIcon sx={{ fontSize: '32px', color: isFindPeopleOpen && blue[700] }} />} text={'People'} onClick={() => handleClick({ type: 'people' })} />
                <ListIconTemplate icon={<Diversity2Icon sx={{ fontSize: '32px', color: isFollowOpen && blue[700] }} />} text={'Following'} onClick={() => handleClick({ type: 'follow' })} />
                <ListIconTemplate icon={<TextsmsIcon sx={{ fontSize: '32px' }} />} text={'Chat'} linkTo={'/chat'} badgeContent={totalMessageCount > 0 ? totalMessageCount : null} />

                <Divider variant="middle" component="li" />

                <ListIconTemplate icon={<PersonIcon sx={{ fontSize: '32px' }} />} text={'Profile'} linkTo={'/profile'} />
                {authData?.result
                    ? < ListIconTemplate icon={<LogoutIcon sx={{ fontSize: '32px' }} />} text={'Logout'} onClick={() => handleClick({ type: 'logout' })} />
                    : < ListIconTemplate icon={<LoginIcon sx={{ fontSize: '32px' }} />} text={'Login'} linkTo={'/auth'} />
                }

            </List>
        {/* <List>
            <ListIconTemplate icon={<HomeIcon />} text={'home'} />
            <ListIconTemplate icon={<HomeIcon />} text={'home'} />
            <ListIconTemplate icon={<HomeIcon />} text={'home'} />
            <ListIconTemplate icon={<HomeIcon />} text={'home'} />
        </List> */}

        </SwipeableDrawer>
    )
}

export default Drawer