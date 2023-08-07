import React, { useState } from 'react'
import { MessageBox, } from './styles'

import { moment } from '../../imports/other'

import {
    Avatar, Box, Typography, blueGrey,
    deepOrange, grey
} from '../../imports/materialuiComponents'



const Message = ({ authorName, authorId, message, createdAt, userId }) => {
    const [isUser, setIsUser] = useState(authorId === userId)
    return (
        <Box component='div'>
            <Box
                sx={{
                    display: 'flex', margin: 1,  alignItems: 'center',
                    flexDirection: isUser ? 'row-reverse' : ''
                }}
            >
                <Avatar sx={{ bgcolor: deepOrange[500], margin: 1, width: 30, height: 30 }}>
                    {authorName && authorName[0]}
                </Avatar>
                <MessageBox bgcolor={isUser ? blueGrey[600] : blueGrey[900]}>
                    <Typography zIndex={10} sx={{ color: "white" }}>{message}</Typography>
                </MessageBox>
            </Box>

            <Box sx={{
                display: 'flex', margin: 1,
                justifyContent: isUser ? 'right' : 'left'
            }}
            >
                <Typography variant='body2' sx={{ color: grey[700] }}>{moment(createdAt).fromNow()} </Typography>
            </Box>

        </Box>
    )
}

export default Message