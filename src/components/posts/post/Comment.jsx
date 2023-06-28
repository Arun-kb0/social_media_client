import React, { useEffect, useState } from 'react'
import { Box, CardContent, TextField, Button, Typography, Avatar } from '@mui/material'
import { CommentBox } from '../styles';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch } from 'react-redux';
import { commentPost } from '../../../redux/features/post/postActions';
import { deepOrange } from '@mui/material/colors';

const Comment = ({ postId, username, postComments, setcommentCount }) => {
    const [commetData, setcommetData] = useState('')
    const [comments, setComments] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        setComments(postComments[postId])
        // console.log(comments)
    }, [postComments[postId]?.length])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(commentPost({
            postId,
            username,
            comment: commetData
        }))
        setcommetData('')
        setcommentCount(postComments[postId]?.length + 1)
    }
    const handleChange = (e) => {
        setcommetData(e.target.value)
    }

    return (
        <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ paddingTop: 1, paddingBottom: 2, maxHeight: '200px', overflowY: 'scroll' }}>
                {comments?.map((comment) => (
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
    <Box sx={{ display: 'flex', marginBottom: 1, alignItems: 'center', justifyContent: 'left' }}>
        <Avatar sx={{ bgcolor: deepOrange[500], marginRight: 1, width: 25, height: 25 }}>
            {username[0]}
        </Avatar>
        <CommentBox>
            <Typography >{comment}</Typography>
        </CommentBox>
    </Box>
)

export default Comment