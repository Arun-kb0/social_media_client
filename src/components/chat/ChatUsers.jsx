import React, { useEffect } from 'react'

import ChatListItem from './ChatListItem'
import { Search, SearchIconWrapper } from '../navbar/styles'
import { StyledChatInputBase, StyledChatUserContainer } from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { getChatUsers } from '../../redux/features/chat/chatActions'

import { Box, List, } from '../../imports/materialuiComponents'
import { SearchIcon } from '../../imports/materialIcons'


const ChatUsers = ({ socket }) => {
    const dispatch = useDispatch()
    const { chatUsers } = useSelector(state => state.chat)
    useEffect(() => {
        let isCanceled = false
        if (!isCanceled)
            dispatch(getChatUsers())
        console.log(chatUsers)
        return () => isCanceled = true
    }, [])

    return (

        <StyledChatUserContainer    >
            <ChatSearch chatUsers={chatUsers} />
            <List sx={{}}>
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
            </List>
        </StyledChatUserContainer>



    )
}


const ChatSearch = () => {

    return (
        <Box sx={{ padding: 1, position: 'sticky', zIndex: 5, top: 0 }}>
            <Search >
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledChatInputBase placeholder='Search...' />
            </Search>
        </Box>
    )
}


export default ChatUsers