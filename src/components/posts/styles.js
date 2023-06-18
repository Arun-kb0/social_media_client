import { CardHeader, styled } from "@mui/material";
import { Card,Box } from '@mui/material'


export const StyledPostsBox = styled(Box)(({ theme }) => ({

    justifyContent: "center",
    alignItems:'center',
    paddingTop:10,
    [theme.breakpoints.up('lg')]:{
        paddingLeft:90
    },
    [theme.breakpoints.only('md')]:{
        paddingLeft:50
    },
    [theme.breakpoints.only('sm')]:{
        paddingLeft:10
    }
}))


export const StyledCard = styled(Card)(({ theme }) => ({
    marginBottom: 20,
    [theme.breakpoints.up('lg')]: {
        height: 'auto',
        width: '80vh'
    },
    [theme.breakpoints.only('md')]: {
        height: 'auto',
        width: '60vh'
    },
    [theme.breakpoints.only('sm')]: {
        height: 'auto',
        width: '50vh'
    }

}))



export const StyledCardHeader = styled(CardHeader)(({ theme }) => ({


}))

