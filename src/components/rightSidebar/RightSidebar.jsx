import React from 'react'
import {
  Avatar, AvatarGroup, Box, ImageList, ListItem, ListItemAvatar,
  ListItemText, Typography, Divider, List
} from '@mui/material'
import { grey } from '@mui/material/colors'

import { StyledBox, StyledInnerBox, StyledTypography } from './styles'

import propic from '../../images/propic.jpg'


const RightSidebar = () => {
  return (
    <Box
      // bgcolor={grey[200]}
      borderRadius={1}

      flex={2} p={1} pr={0}
      alignItems='center'
      justifyContent='end'
      sx={{ display: { xs: 'none', sm: 'flex' } }}
    >
      <StyledInnerBox>
        <StyledBox  >
          <StyledTypography variant='h6' >
            Online friends
          </StyledTypography>
          <AvatarGroup sx={{ display: 'flex', justifyContent: 'center', }} max={5}>
            <Avatar alt="person1" src={propic} />
            <Avatar alt="person1" src={propic} />
            <Avatar alt="person1" src={propic} />
            <Avatar alt="person1" src={propic} />
            <Avatar alt="person1" src={propic} />
            <Avatar alt="person1" src={propic} />
            <Avatar alt="person1" src={propic} />
            <Avatar alt="person1" src={propic} />
          </AvatarGroup>
        </StyledBox>


        <StyledBox>
          <StyledTypography variant='h6'  >
            Latest Conversations
          </StyledTypography>

        <Box sx={{display:'flex' , justifyContent:'center' }}>
          <List sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}  >
            <ListItem  >
              <ListItemAvatar><Avatar src={propic} alt={"name"} /> </ListItemAvatar>
              <ListItemText
                primary="Summer BBQ"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      to Scott, Alex, Jennifer
                    </Typography>
                    {" — Wish I could come, but I'm out of town this…"}
                  </React.Fragment>
                }
              />

            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
        </Box>

        </StyledBox>


      </StyledInnerBox>
    </Box>
  )
}

export default RightSidebar