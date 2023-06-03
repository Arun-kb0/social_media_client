import { Toolbar, Box, InputBase, IconButton } from "@mui/material";
import { styled, alpha } from '@mui/material/styles';


export const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: 'space-between'
})

export const Search = styled(Box)(({ theme }) => ({
    position: 'relative',
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
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
    color: 'inherit',
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




