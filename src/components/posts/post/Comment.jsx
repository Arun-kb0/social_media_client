import React, { useEffect, useState, useRef } from 'react'
import { Box, CardContent, TextField, Button, Typography, Avatar, IconButton } from '@mui/material'
import { CommentBox, StyledCommentText } from '../styles';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from 'react-redux';
import { deepOrange } from '@mui/material/colors';
import { commentPostListener, deleteComment } from '../../../redux/features/post/postActions';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { corsOptions } from '../../../../../server/config/corsOptions';


const Comment = ({ postId, username, postComments, setcommentCount, creatorId }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [commetData, setcommetData] = useState('')
    const [comments, setComments] = useState(null)

    const scrollRef = useRef(null)

    const { authData, userId } = useSelector(state => state.auth)





    const { socket } = useSelector(state => state.socketioReducer)
    const handleSubmit = (e) => {
        if (!authData) navigate('/auth')
        if (commetData !== '') {
            socket.emit("commentPost", {
                postId,
                username,
                comment: commetData
            })
            setcommetData('')
            setcommentCount(postComments[postId]?.length + 1)
        }
    }
    const handleChange = (e) => {
        setcommetData((prev) => e.target.value)
    }

    useEffect(() => {
        setComments(postComments[postId])
    }, [postComments[postId]?.length])

    useEffect(() => {
        if (socket && creatorId) {
            const cleanup = dispatch(commentPostListener(creatorId))
            return () => dispatch(cleanup)
        }
    }, [socket, creatorId])


    const handleDeleteComment = ({ commentId, commentedUserId }) => {
        if (!authData) navigate('/auth')
        console.log(postId, commentId, commentedUserId)
        dispatch(deleteComment({ postId, creatorId, commentId, commentedUserId }))
    }


    return (
        <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ paddingTop: 1, paddingBottom: 2, maxHeight: '200px', overflowY: 'auto' }}>
                {comments?.map((comment) => (
                    <CommentText
                        key={comment._id}
                        commentId={comment._id}
                        commentedUserId={comment.userId}
                        userId={userId}
                        creatorId={creatorId}
                        comment={comment.comment}
                        username={comment.username}
                        handleDeleteComment={handleDeleteComment}
                    />
                ))}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                <TextField
                    onChange={handleChange}
                    value={commetData}
                    id="outlined-textarea"
                    placeholder="Type Somthing..."
                    minRows={1}
                    maxRows={5}
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


const CommentText = ({ comment, username, handleDeleteComment, commentId, commentedUserId, creatorId, userId }) => {
    

    return (
        <StyledCommentText component='div'>
            <Avatar sx={{ bgcolor: deepOrange[500], marginRight: 1, width: 25, height: 25 }}>
                {username[0]}
            </Avatar>
            <CommentBox>
                <Typography >{comment}</Typography>
            </CommentBox>

            {(commentedUserId === userId  | creatorId === userId )
                ? <IconButton
                    size='small' pl={5}
                    onClick={() => handleDeleteComment({ commentId, commentedUserId })}
                >
                    <DeleteIcon fontSize="inherit" />
                </IconButton>
                : <></>
            }
        </StyledCommentText>
    )
}

export default Comment