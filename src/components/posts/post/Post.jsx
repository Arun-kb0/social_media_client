import React, { useEffect, useState } from 'react'

import {
  Avatar, CardActions, CardContent, CardHeader, CardMedia,
  Checkbox, IconButton, Typography, Menu, MenuItem,
  ListItemIcon, Collapse
} from '@mui/material'

import { grey, red } from '@mui/material/colors'
import moment from 'moment'

import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { StyledCard } from '../styles';
import { deletePost, getComments, likePost } from '../../../redux/features/post/postActions'

import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Comment from './Comment';




const Post = ({ post, likedPostIds, userId, username }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [expanded, setExpanded] = useState(false)
  const [likeState, setLikeState] = useState({
    isLiked: false,
    likeCount: post.like_count
  })
  const [commentCount, setcommentCount] = useState(null)
  const dispatch = useDispatch()
  const { postComments } = useSelector(state => state.post)




  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLike = () => {
    dispatch(likePost(post?._id, username))
    setLikeState(prev => ({
      isLiked: !prev.isLiked,
      likeCount: !prev.isLiked ? prev.likeCount + 1 : prev.likeCount - 1
    }))
  }


  const handleExpanded = () => {
    setExpanded(prev => !prev)
    if (expanded === false && !postComments[post._id]) {
      dispatch(getComments(post._id))
    }
  }

  useEffect(() => {
    const bit = Boolean(likedPostIds.find(id => id === post._id))
    console.log(bit)
    setLikeState(prev => ({ ...prev, isLiked: bit }))
  }, [likedPostIds.length])

  return (
    <div style={{ alignItems: 'center' }} id='cardcontainer'>

      <StyledCard raised={true} >
        <CardHeader

          component='div'
          avatar={
            <Avatar sx={{ backgroundColor: red[500] }} aria-label="post">
              {post?.creator_name?.charAt(0)}
            </Avatar>
          }
          action={
            post.creator_id == userId &&
            <IconButton onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
          }
          title={post?.title}
          subheader={moment(post?.createdAt).fromNow()}
        >
        </CardHeader>



        <CardMedia
          component='img'
          height={'200px'}
          image={post.selectedFile}
          alt='post image'
        />

        <CardContent>
          <Typography variant='p' component='p'>{post?.message}</Typography>
          <Typography variant='p' component='p'>{ }</Typography>
          {post.tags?.map((tag, index) => (
            <Typography variant="p" color={grey[600]} key={`${index}${post._id}`} >{`#${tag} `}</Typography>
          ))}
        </CardContent>

        <CardActions >

          <>
            {likeState.likeCount}
            <Checkbox
              onClick={handleLike}
              checked={likeState.isLiked}
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite sx={{ color: red[500] }} />}
            />
          </>

          <>
            {commentCount ? commentCount :  post.comment_count}
            <IconButton onClick={handleExpanded}>
              <ModeCommentIcon />
            </IconButton>
          </>

          <IconButton>
            <ShareIcon />
          </IconButton>
        </CardActions>

        <Collapse in={expanded} timeout={'auto'} unmountOnExit>
          <Comment
            username={username}
            postId={post._id}
            postComments={postComments}
            setcommentCount={setcommentCount}
          />
        </Collapse>

      </StyledCard>

      <MoreMenu
        handleMenuClose={handleMenuClose}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        postId={post._id}
        post={post}
      />


    </div>
  )
}



const MoreMenu = ({ handleMenuClose, anchorEl, setAnchorEl, postId, post }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClick = (type) => {
    switch (type) {
      case 'delete':
        dispatch(deletePost(postId))
        handleMenuClose()
        return
      case 'edit':
        handleMenuClose()
        navigate('/edit', { state: { post } })
        return

      default:
        handleMenuClose()
        return
    }

  }

  return (
    <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleMenuClose}>
      <MenuItem onClick={() => handleClick('delete')}>
        <ListItemIcon>
          <DeleteIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="inherit">Delete</Typography>
      </MenuItem>

      <MenuItem onClick={() => handleClick('edit')}>
        <ListItemIcon>
          <EditTwoToneIcon fontSize='small' />
        </ListItemIcon>
        <Typography variant="inherit">Edit</Typography>
      </MenuItem>
    </Menu>
  )
}



export default Post
