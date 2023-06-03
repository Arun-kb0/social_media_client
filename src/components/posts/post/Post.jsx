import React from 'react'
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Checkbox,  IconButton } from '@mui/material'
import { grey, red } from '@mui/material/colors'

import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import paella from '../../../images/paella.jpg'

const Post = () => {
  return (
    <Card elevation={4} sx={{marginBottom:5}} bgColor={grey[500]}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgColor: red[500] }} aria-label="post">
            J
          </Avatar>
        }
        action={
          <IconButton >
            <MoreVertIcon />
          </IconButton>
        }
        title='john Doe'
        subheader={'september 14 2010'}
      />

      <CardMedia
        component='img'
        height='20%'
        image={paella}
        alt='post image'
      />

      <CardContent>
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
      </CardContent>
    </Card>
  )
}

export default Post