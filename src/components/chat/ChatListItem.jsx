
import React, { useEffect } from 'react'
import { Avatar, Badge, Box, ListItem, ListItemAvatar, ListItemButton, Typography } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { createRoom, getMessages } from '../../redux/features/chat/chatActions'
import { grey, orange } from '@mui/material/colors'




const ChatListItem = ({ name, photo, id, socket, lastMessage, isOnline }) => {

    const dispatch = useDispatch()

    const handleChat = () => {
        dispatch(createRoom({ socket, id, name, photo }))
        dispatch(getMessages({ id }))
    }
    return (
        <ListItem
            disablePadding
            sx={{ borderRadius: '15px', width: '95%', marginBottom: 0.5 }}
            onClick={handleChat}
        >

            <ListItemButton sx={{ borderRadius: '15px' }} >
                <ListItemAvatar >
                    <ChatUserAvatar
                        photo={photo}
                        isOnline={isOnline}
                        name={name}
                    />
                </ListItemAvatar>

                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="p" >{name}</Typography>
                    <Typography variant="body2" sx={{ color: grey[600] }} >{lastMessage}</Typography>
                </Box>

            </ListItemButton>
        </ListItem>
    )
}


const ChatUserAvatar = ({ photo, isOnline, name }) => (
    photo
        ? (
            <Badge badgeContent='' color='success' overlap="circular" variant="dot" invisible={isOnline ? false : true}  >
                <Avatar src={photo} alt='' sx={{ width: 45, height: 45 }} />
            </Badge>
        ) : (
            <Badge badgeContent='' color='success' overlap="circular" variant="dot" invisible={isOnline ? false : true}  >
                <Avatar src='' alt='' sx={{ width: 45, height: 45, bgcolor: orange[800] }} >
                    <Typography variant='h4' >{name[0]}</Typography>
                </Avatar>
            </Badge>
        )

)

export default ChatListItem
