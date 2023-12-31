import { Avatar, Box, Paper, styled, } from '../../imports/materialuiComponents'

export const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: 'gray',
    display: 'flex',
    alignItems: 'center',
    height: '100vh',
    [theme.breakpoints.only('xs')]: {
        height: '170vh'
    }
}))

export const StyledPaper = styled(Paper)(({ theme }) => ({
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    [theme.breakpoints.only('xs')]: {
        marginTop: theme.spacing(3),
    }
}))


export const StyledAvatar = styled(Avatar)(({ theme }) => ({
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
}))

export const StyledForm = styled('form')(({ theme }) => ({
    width: '100%',
    marginTop: theme.spacing(3)
}))
