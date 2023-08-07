import React, { useEffect, useState } from 'react'
import { useDispatch ,useSelector} from 'react-redux'

import ChatListItem from '../chat/ChatListItem'
import { getChatUsers } from '../../redux/features/chat/chatActions'
import { StyledBox, StyledInnerBox, StyledTypography } from './styles'

import { Box } from '../../imports/materialuiComponents'


const RightSidebar = () => {
  const dispatch = useDispatch()
  const [isCanceled, setsetIsCanceled] = useState(false)

  const { onlineUsers, chatUsers } = useSelector(state => state.chat)
  const { socket } = useSelector(state => state.socketioReducer)
  const { userId } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(getChatUsers())
  }, [userId])

  return (
    <Box
      borderRadius={1}

      flex={2} p={1} pr={0}
      alignItems='center'
      justifyContent='end'
      sx={{ display: { xs: 'none', sm: 'flex' } }}
    >
      <StyledInnerBox>

        <StyledTypography variant='h6' >
          Online friends
        </StyledTypography>
        <StyledBox  >
          {onlineUsers?.map((user) => (
            <ChatListItem
              key={user.userId}
              socket={socket}
              name={user.name}
              photo={user.photo}
              id={user.userId}
              lastMessage={user?.lastMessage ? user.lastMessage : ''}
              isOnline={user.isOnline}
            />
          ))}
        </StyledBox>


        <StyledTypography variant='h6'  >
          Chat
        </StyledTypography>
        <StyledBox>
          <Box pt={5}>
            {chatUsers?.map((user) => (
              <ChatListItem
                key={user.userId}
                socket={socket}
                name={user.name}
                photo={user.photo}
                id={user.userId}
                lastMessage={user?.lastMessage ? user.lastMessage : ''}
                isOnline={user.isOnline}
              />
            ))}

          </Box>

        </StyledBox>


      </StyledInnerBox>
    </Box>
  )
}

export default RightSidebar