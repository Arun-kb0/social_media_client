import React, { useState } from 'react'
import {
  Avatar, CardActions, CardContent, CardHeader, CardMedia,
  Checkbox, IconButton, Typography, Menu, MenuItem, Popper, ListItemIcon
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

const Post = ({ post }) => {
  const [moreOpen, setMoreOpen] = useState(false)

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  return (
    <div sx={{ textAlign: 'center' }}>

      <StyledCard raised={true}>
        <CardHeader
          component='div'
          avatar={
            <Avatar sx={{ backgroundColor: red[500] }} aria-label="post">
              {post?.creator?.charAt(0)}
            </Avatar>
          }
          action={
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
          height='20%'
          image={post.selectedFile}
          sx={{ height: { md: '30%' } }}
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
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite sx={{ color: red[500] }} />}
            />

          <IconButton>
            <ModeCommentIcon />
          </IconButton>

          <IconButton>
            <ShareIcon />
          </IconButton>

        </CardActions>

      </StyledCard>


      <MoreMenu
        handleMenuClose={handleMenuClose}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
      />

    </div>
  )
}

export default Post




const MoreMenu = ({ handleMenuClose, anchorEl, setAnchorEl }) => {

  return (
    <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleMenuClose}>
      <MenuItem onClick={handleMenuClose}>
        <ListItemIcon>
          <DeleteIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="inherit">Delete</Typography>
      </MenuItem>

      <MenuItem onClick={handleMenuClose}>
        <ListItemIcon>
          <EditTwoToneIcon fontSize='small' />
        </ListItemIcon>
        <Typography variant="inherit">Edit</Typography>
      </MenuItem>
    </Menu>
  )
}
