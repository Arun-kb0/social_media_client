import { CardHeader, styled } from "@mui/material";
import { Card, Box } from '@mui/material'
import { grey } from '@mui/material/colors';
import ScrollToBottom from 'react-scroll-to-bottom'


export const StyledPostsBox = styled(Box)(({ theme }) => ({

    justifyContent: "center",
    alignItems: 'center',
    paddingTop: 10,

    [theme.breakpoints.up('lg')]: {
        paddingLeft: 90
    },
    [theme.breakpoints.only('md')]: {
        paddingLeft: 50
    },
    [theme.breakpoints.only('sm')]: {
        paddingLeft: 10
    }
}))


export const StyledCard = styled(Card)(({ theme }) => ({
    position: 'relative',
    marginBottom: 20,
    [theme.breakpoints.up('lg')]: {
        height: 'auto',
        width: '85vh'
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


export const CommentBox = styled(Box)(({ theme }) => ({
    borderRadius: '10px',
    backgroundColor: grey[200],
    padding: 10,
    paddingLeft: 12,
    maxWidth: '250px',
}))




export const StyledScrollToBottom = styled(ScrollToBottom)(({ theme }) => ({
    paddingTop: 1,
    paddingBottom: 2,
    maxHeight: '200px',
    overflowY: 'scroll'

}))




export const StyledCommentText = styled(Box)(({ theme }) => ({
    display: 'flex',
    marginBottom: 1,
    alignItems: 'center',
    justifyContent: 'left'
}))


