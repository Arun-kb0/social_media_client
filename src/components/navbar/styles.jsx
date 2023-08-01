import { Toolbar, Box, InputBase, IconButton, Popper, Stack, Paper } from "@mui/material";
import { grey } from "@mui/material/colors";
import { styled, alpha } from '@mui/material/styles';
import zIndex from "@mui/material/styles/zIndex";


export const StyledStack = styled(Stack)(({ theme }) => ({
    position: 'absolute',
    top: 70,
    left: '50%',
    transform: 'translateX(-50%)',
}))



export const StyledPaper = styled(Paper)(({ theme }) => ({
    width: '90vh',
    maxHeight: '60vh',
    height: 'auto',
    overflowY:'scroll',
    '&::-webkit-scrollbar':{
        display:'none'
    },
    // '&::-wbkit-scrollbar-thumb':{
    //     backgroundColor:"grey",
    //     borderRadius:'6px'
    // }
}))


export const StyledOption = styled('li')(({ theme }) => ({
    padding: '8px',
    borderRadius: '8px',
    cursor: 'default'
}))


export const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: 'space-between'
})

export const Search = styled(Box)(({ theme }) => ({
    position: 'relative',
    marginRight: theme.spacing(2),
    marginLeft: 0,

    width: '100%',
    borderRadius: '30px',
    // backgroundColor: alpha(theme.palette.common.white, 0.15),
    backgroundColor: grey[300],
    color: grey[700],
    '&:hover': {
        backgroundColor: alpha(grey[300], 0.50),
    },
    [theme.breakpoints.up('sm')]: {
        marginRight: theme.spacing(3),
        width: 'auto',
    },

}))

export const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'

}))

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '50ch',
        },
    },

}))

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    color: grey[700],
    '&:focus': { outline: 'none' },
}))


export const Icons = styled(Box)(({ theme }) => ({
    display: 'none',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
        display: 'flex'
    }
}))


export const UserBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    [theme.breakpoints.up('sm')]: {
        display: 'none'
    }
}))




