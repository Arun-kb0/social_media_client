import React from 'react'
import { Box, List,Divider } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import { grey } from '@mui/material/colors'
import ListIconTemplate from './ListIconTemplate';
import { StyledInnerBox } from './styles';
import AddIcon from '@mui/icons-material/Add';
import LoginIcon from '@mui/icons-material/Login';

import { Link } from 'react-router-dom';


const LeftSidebar = () => {
  return (
    <Box
      // bgcolor={'red'}
      borderRadius={1}
      flex={1} p={2} pl={0}
      alignItems={'center'}
      justifyContent='start'
      sx={{ display: { xs: 'none', sm: 'flex' } }}
    >
      <StyledInnerBox>

        <List component='div' >
          <ListIconTemplate icon={<HomeIcon sx={{ fontSize: '32px' }} />} text={'home'} />
          <ListIconTemplate icon={<AddIcon sx={{ fontSize: '32px' }} />} text={'Create Post'} linkTo={'/create'} />

          <Divider variant="middle" component="li" />
          <ListIconTemplate icon={<LoginIcon sx={{ fontSize: '32px' }} />} text={'login'} linkTo={'/auth'} />
        </List>

      </StyledInnerBox>
    </Box>
  )
}





export default LeftSidebar