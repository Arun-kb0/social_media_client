import React from 'react'

import ListIconTemplate from './ListIconTemplate';
import { StyledInnerBox } from './styles';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/features/auth/authActions';
import { SET_FIND_PEOPLE_OPEN, SET_FOLLOWING_OPEN, SET_POSTS_OPEN } from '../../constants/actionTypes';
import { clearChatState } from '../../redux/features/chat/chatActions';

import { Box, List, Divider  , blue} from '../../imports/materialuiComponents'

import {
  HomeIcon, LoginIcon, LogoutIcon, GroupIcon,
  Diversity2Icon, TextsmsIcon, AddIcon,PersonIcon
} from '../../imports/materialIcons';

const LeftSidebar = () => {
  const dispatch = useDispatch()
  const { authData } = useSelector(state => state.auth)
  const { isFindPeopleOpen, isPostsOpen, isFollowOpen } = useSelector(state => state.buttonToggle)
  const { totalMessageCount } = useSelector(state => state.user)


  const handleClick = ({ type }) => {
    switch (type) {
      case 'home':
        dispatch({ type: SET_POSTS_OPEN, payload: true })
        break
      case 'people':
        dispatch({ type: SET_FIND_PEOPLE_OPEN, payload: true })
        break;
      case 'follow':
        dispatch({ type: SET_FOLLOWING_OPEN, payload: true })
        break;

      case 'logout':
        dispatch(clearChatState())
        dispatch(logout())
        break;

      default:
        break;
    }
  }

  return (
    <Box
      borderRadius={1}
      flex={1} p={2} pl={0}
      alignItems={'center'}
      justifyContent='start'
      sx={{ display: { xs: 'none', sm: 'flex' } }}
    >
      <StyledInnerBox>

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

      </StyledInnerBox>
    </Box>
  )
}





export default LeftSidebar