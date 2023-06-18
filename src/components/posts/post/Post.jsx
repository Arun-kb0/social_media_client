import React from 'react'
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Checkbox, IconButton, Typography } from '@mui/material'
import { grey, red } from '@mui/material/colors'
import moment from 'moment'

import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { StyledCard } from '../styles';

const Post = ({ post }) => {
  return (
    <StyledCard
      bgColor={grey[500]}
      raised={true}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ backgroundColor: red[500] }} aria-label="post">
            {post?.creator?.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton >
            <MoreVertIcon />
          </IconButton>
        }
        title={post?.title}
        subheader={moment(post?.createdAt).fromNow()}
      />

      <CardMedia
        component='img'
        height='20%'
        image={post.selectedFile}
        sx={{height:{md:'30%'}}}
        alt='post image'
      />

      <CardContent>
        <Typography variant='p' component='p'>{post?.message}</Typography>
        <Typography variant='p' component='p'>{ }</Typography>
        {post.tags?.map(tag => (
          <Typography variant="p" color={grey[600]} >{`#${tag} `}</Typography>
        ))}
      </CardContent>

      <CardActions >
        <IconButton >
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ color: red[500] }} />}
          />
        </IconButton>
        <IconButton>
          <ShareIcon />
        </IconButton>
      </CardActions>
    </StyledCard>
  )
}

export default Post