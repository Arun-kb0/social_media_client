import { Box, Typography, } from "@mui/material";
import { grey, blue } from "@mui/material/colors";
import { styled } from '@mui/material/styles';


export const StyledInnerBox = styled(Box)(({ theme }) => ({
    position: 'fixed',
    width: '25ch',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: '100vh',
    paddingLeft: 10,

    [theme.breakpoints.only('md')]: {
        width: '30ch',
    },
    [theme.breakpoints.up('lg')]: {
        width: '45ch',
        paddingLeft: 30,
    },
    [theme.breakpoints.up('xl')]: {
        width: '50ch',
        paddingLeft: 30,
    },
}))


export const StyledBox = styled(Box)(({ theme }) => ({

    display: 'flex',
    justifyContent: "center",
    flexDirection: 'column',
    marginBottom: 30,
    height: 'auto',
    maxHeight: '400px',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
        display: 'none'
    }
}))

export const StyledTypography = styled(Typography)({
    display: 'flex',
    justifyContent: 'center',
    padding: 2,
    paddingBottom: 10,
    fontWeight: 100,
    color: blue[700],

})