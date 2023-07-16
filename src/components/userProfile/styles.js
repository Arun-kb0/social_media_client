import { Box, Button, Divider, styled } from "@mui/material";
import { grey,red } from "@mui/material/colors";



export const StyledBox = styled(Box)(({theme})=>({
    display: 'flex',
     justifyContent: 'center'
}))

export const ProfileButtons = styled(Button)(({ theme }) => ({
    backgroundColor: grey[200],
    color: grey[800],
    ":hover": {
        backgroundColor: grey[500],
        color: grey[100],
    }
}))

export const ButtonDivider = styled(Divider)(({ theme }) => ({
    height: '3px',
    width: '80%',
    backgroundColor: red[600],
    borderRadius:'20px',
    margin:1,
}))

