import { Box, Button, Divider, styled, grey, red } from '../../imports/materialuiComponents'


export const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center'
}))

export const StyledBoxContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '60%',
    [theme.breakpoints.up('xl')]: {
        width: '40%',
    },
    [theme.breakpoints.only('xs')]: {
        width:'90%'
    }
}))

export const ProfileButtons = styled(Button)(({ theme }) => ({
    backgroundColor: grey[200],
    color: grey[800],
    ":hover": {
        backgroundColor: grey[500],
        color: grey[100],
    },
    ":active": {
        backgroundColor: grey[700],
        color: grey[100],
    },
    [theme.breakpoints.only('xs')]:{
        fontSize:'10px'
    }
}))


export const ButtonDivider = styled(Divider)(({ theme }) => ({
    height: '3px',
    width: '100%',
    backgroundColor: red[600],
    borderRadius: '20px',
    margin: 1,
}))

