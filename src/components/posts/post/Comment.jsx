import React, { useEffect, useState, useRef } from 'react'
import { Box, CardContent, TextField, Button, Typography, Avatar } from '@mui/material'
import { CommentBox, StyledScrollToBottom } from '../styles';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch } from 'react-redux';
import { commentPost } from '../../../redux/features/post/postActions';
import { deepOrange } from '@mui/material/colors';
import ScrollToBottom from 'react-scroll-to-bottom'

const Comment = ({ postId, username, postComments, setcommentCount }) => {
    const [commetData, setcommetData] = useState('')
    const [comments, setComments] = useState(null)
    const dispatch = useDispatch()

    const scrollRef = useRef(null)


    useEffect(() => {
        setComments(postComments[postId])
    }, [postComments[postId]?.length])

    const handleSubmit = (e) => {

        if (commetData !== '') {
            dispatch(commentPost({
                postId,
                username,
                comment: commetData
            }))
            setcommetData('')
            setcommentCount(postComments[postId]?.length + 1)
        }
    }
    const handleChange = (e) => {
        setcommetData(e.target.value)
    }

    return (
        <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ paddingTop: 1, paddingBottom: 2, maxHeight: '200px', overflowY: 'auto' }}>
                {comments?.map((comment, index) => (
                    <CommentText
                        key={comment._id}
                        comment={comment.comment}
                        username={comment.username}
                    />
                ))}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                <TextField
                    onChange={handleChange}
                    value={commetData}
                    id="outlined-textarea"
                    placeholder="Type Somthing..."
                    multiline
                    fullWidth
                />
                <Button
                    onClick={handleSubmit}
                    variant='contained'
                    size='small'
                    sx={{ margin: '1px', marginLeft: '10px', maxHeight: '7.5vh' }}
                >
                    <SendIcon />
                </Button>
            </Box>
        </CardContent>
    )
}


const CommentText = ({ comment, username }) => (
    <Box
        component='div'
        sx={{ display: 'flex', marginBottom: 1, alignItems: 'center', justifyContent: 'left' }}

    >
        <Avatar sx={{ bgcolor: deepOrange[500], marginRight: 1, width: 25, height: 25 }}>
            {username[0]}
        </Avatar>
        <CommentBox>
            <Typography >{comment}</Typography>
        </CommentBox>
    </Box>
)

export default Comment