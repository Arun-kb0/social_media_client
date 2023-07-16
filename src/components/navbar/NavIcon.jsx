import { Badge } from '@mui/material'
import { StyledIconButton } from './styles'

const NavIcon = ({ icon, badgeContent, variant, isOnline,overlap }) => (
    <StyledIconButton>
        <Badge
            badgeContent={badgeContent}
            color={isOnline ? 'success' : 'error'}
            variant={variant}
            overlap={overlap}

        >
            {icon}
        </Badge>
    </StyledIconButton>
)

export default NavIcon
