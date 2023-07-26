import React, { useState, useEffect, useRef, } from 'react'
import { Avatar, Box, Button, IconButton, TextField, Typography } from '@mui/material'
import { StyledChatHeader, StyledChatBox, } from './styles'
import { grey, deepOrange } from '@mui/material/colors';

import SendIcon from '@mui/icons-material/Send';
import VideocamIcon from '@mui/icons-material/Videocam';
import CallIcon from '@mui/icons-material/Call';
import Message from './Message';
import { useSelector, useDispatch } from 'react-redux'
import {  reciveMessage, sendMessage } from '../../redux/features/chat/chatActions';
import ChatUsers from './ChatUsers';


const Chat = () => {
    const chatContainerRef = useRef(null)
    const [messageInput, setMessageInput] = useState('')
    const [chatsocket, setChatsocket] = useState(null)

    const dispatch = useDispatch()
    const { messages, chatUser, chatUsers } = useSelector(state => state.chat)
    const { userId } = useSelector(state => state.auth)
    const { socket } = useSelector(state => state.socketioReducer)

    useEffect(() => {
        const cleanup = dispatch(reciveMessage({ socket }));
        return () => dispatch(cleanup)
    }, [socket]);

    useEffect(() => {
        setTimeout(() => {
            chatContainerRef?.current?.scrollIntoView({ behavior: "smooth" });
        }, [100])
    }, [messages?.length])

    const handleSendMessage = () => {
        console.log(messageInput.length)
        if (messageInput.length > 0) {
            dispatch(sendMessage({ socket, id: null, messageInput }))
            setMessageInput('')
        }
    }
    const handleKey = (e) => {
        e.key === 'Enter' && handleSendMessage()
    }

    const handleChange = (e) => {
        setMessageInput(e.target.value)
    }


    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: grey[400], height: "100vh" }}>
            <StyledChatBox >

                <Box sx={{ flex: '0.5', display: 'flex', justifyContent: 'center', padding: 1 }}>

                    <ChatUsers
                        chatUsers={chatUsers}
                        socket={socket}
                    />
                </Box>

                <Box sx={{ flex: '2' }}>

                    <ChatHeader chatUser={chatUser} />
                    <Messages
                        messages={messages}
                        userId={userId}
                        chatContainerRef={chatContainerRef}
                    />

                    <Box sx={{ display: 'flex', justifyContent: 'end', padding: 1, }}>
                        <TextField
                            onChange={handleChange}
                            onKeyDown={handleKey}
                            value={messageInput}
                            id="standard-textarea"
                            placeholder="Type Somthing..."
                            multiline
                            variant="standard"
                            rows={2}
                            fullWidth
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center' }} >
                            <Button
                                variant='contained' size='small'
                                disabled={chatUser ? false : true}
                                onClick={handleSendMessage}
                            >
                                <SendIcon />
                            </Button>
                        </Box>

                    </Box>

                </Box>

            </StyledChatBox>
        </Box>
    )
}



const ChatHeader = ({ chatUser }) => (
    <StyledChatHeader >
        <Box sx={{ display: 'flex', p: 0.5, alignItems: 'center' }}>
            <Avatar src={chatUser?.photo}
                sizes=''
                sx={{ width: 30, height: 30, bgcolor: deepOrange[600], display: chatUser?.name ? 'flex' : 'none' }}
            >
                {!chatUser?.photo && chatUser?.name && chatUser?.name[0]}
            </Avatar>
            <Typography variant='body1' sx={{ pl: 1, color: grey[100] }}>
                {chatUser?.name}
            </Typography>
        </Box>
        <Box>
            <IconButton size='small' sx={{ p: 1 }}>
                <VideocamIcon sx={{ color: grey[100] }} />
            </IconButton>

            <IconButton size='small' sx={{ p: 1 }}>
                <CallIcon sx={{ color: grey[100] }} />
            </IconButton>
        </Box>
    </StyledChatHeader>
)



const Messages = ({ messages, userId, chatContainerRef }) => (
    <Box sx={{
        height: '79.5%', bgcolor: grey[200], padding: 1,
        overflowY: 'scroll',
        '&::-webkit-scrollbar': {
            display: 'none'
        }
    }}
    >
        {messages?.map((message) => (
            <Message
                key={message.id}
                authorName={message.authorName}
                authorId={message.authorId}
                message={message.message}
                createdAt={message.createdAt}
                userId={userId}
            />
        ))}
        <div ref={chatContainerRef}></div>
    </Box>
)



export default Chat