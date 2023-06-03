import { Divider, ListItemText, ListItemButton, ListItem } from '@mui/material'
import { StyledListItemIcon } from './styles'
import {Link} from 'react-router-dom'

const ListIconTemplate = ({ icon, text, linkTo }) => (
  <ListItem
    component="div"
    disablePadding
  >
    <ListItemButton
      component={Link} to={linkTo}
      sx={{ borderRadius: "15px", }}
    >
      <StyledListItemIcon component='a'   >
        {icon}
      </StyledListItemIcon>
      <ListItemText primary={text} sx={{ px: 1 }} />
    </ListItemButton>
  </ListItem>
)

export default ListIconTemplate