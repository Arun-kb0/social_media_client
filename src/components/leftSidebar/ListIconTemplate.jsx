import { Divider, ListItemText, ListItemButton, ListItem, Badge } from '@mui/material'
import { StyledListItemIcon } from './styles'
import { Link } from 'react-router-dom'

const ListIconTemplate = ({ icon, text, linkTo, onClick , badgeContent}) => (
  <ListItem
    component="div"
    disablePadding
  >
    <ListItemButton
      component={Link} to={linkTo}
      onClick={onClick}
      sx={{ borderRadius: "15px", }}
    >
      <StyledListItemIcon component='a'   >
        <Badge color='error' variant={badgeContent? "dot" : ''} >
        {icon}
        </Badge>
      </StyledListItemIcon>
      <ListItemText primary={text} sx={{ px: 1 }} />
    </ListItemButton>
  </ListItem>
)

export default ListIconTemplate