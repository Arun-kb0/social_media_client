import { Box, ListItemIcon, styled } from '../../imports/materialuiComponents'


export const StyledInnerBox = styled(Box)(({ theme }) => ({
    position: 'fixed',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: '100vh',
    [theme.breakpoints.only("sm")]: {
        width: '15ch'
    },
    [theme.breakpoints.up("md")]: {
        width: '19ch'
    },
    [theme.breakpoints.up("lg")]: {
        width: '26ch'
    }
}))

export const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
    minWidth: 45,
    justifyContent: 'end',
    paddingRight: 7,
    paddingLeft: 2,
    [theme.breakpoints.up('lg')]: {
        minWidth: 52,
    },
    [theme.breakpoints.only('md')]: {
        minWidth: 45,
    },
    [theme.breakpoints.only('sm')]: {
        minWidth: 34,
    }
}))