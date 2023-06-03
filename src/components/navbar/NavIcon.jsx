import { Badge } from '@mui/material'
import {StyledIconButton} from './styles'

const NavIcon = ({ icon, badgeContent }) => (
    <StyledIconButton>
        <Badge badgeContent={badgeContent} color='error'>
            {icon}
        </Badge>
    </StyledIconButton>
)

export default NavIcon
