import { Box, InputBase, styled, green ,Fab} from '../../imports/materialuiComponents'

export const StyledChatBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    width: '65%',
    marginTop: 60,
    height: '80%',
    backgroundColor: 'white',
    borderRadius: '15px',
    [theme.breakpoints.up('lg')]: {
        width: '65%',
    },
    [theme.breakpoints.only('md')]: {
        width: '85%',
    },
    [theme.breakpoints.only('sm')]: {
        width: '90%',
    },
    [theme.breakpoints.only('xs')]: {
        width: '100%',
        height: '90%'
    },
}))


export const StyledChatInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('lg')]: {
            width: '21ch',
        },
        [theme.breakpoints.only('md')]: {
            width: '18ch',
        },
        [theme.breakpoints.only('sm')]: {
            width: '13ch',
        },

    },
}))


export const MessageBox = styled(Box)(({ theme }) => ({
    borderRadius: '10px',
    // backgroundColor: grey[500],
    padding: 10,
    paddingLeft: 12,
    height: 'auto',
    maxWidth: '250px',
    [theme.breakpoints.up('md')]: {
        maxWidth: '350px'
    },
    [theme.breakpoints.up('xs')]: {
        // maxWidth: '98%'
    }
}))

export const StyledChatHeader = styled(Box)(({ theme }) => ({
    borderTopRightRadius: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    paddingRight: 5,
    height: '7%',
    backgroundColor: green[600],
    [theme.breakpoints.only('xs')]: {
        height:'10%'
    }
}))

export const StyledChatUserContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    height: 'auto',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
        display: 'none',
    },
    [theme.breakpoints.only("sm")]: {
        width: '200px',
    },
    [theme.breakpoints.up("md")]: {
        width: '250px',
    },
    [theme.breakpoints.only('xs')]: {
        // display:'none'
    }
}))


export const StyledChatUserShowBtn = styled(Fab)(({ theme }) => ({
    position: 'fixed',
    top: 150,
    left: 10,
   
    [theme.breakpoints.only('xs')]:{
        display:'flex'
    },
    [theme.breakpoints.up('sm')]: {
        display: 'none'
    },
}))