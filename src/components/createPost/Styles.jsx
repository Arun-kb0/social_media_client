// import { Box, styled, alpha, TextField } from "@mui/material";
// import { Container } from '@mui/material'
// import { grey } from '@mui/material/colors'

import { Box, styled, alpha, Container, grey } from '../../imports/materialuiComponents'



export const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: grey[300],
    height: '100vh',
    marginTop: 30,
    // position: 'fixed',
    // right: 0, top: 30, left: 0,
    // overflowY:'scroll'
}))



export const StyledContainer = styled(Container)(({ theme }) => ({
    backgroundColor: 'white',
    width: '60%',
    borderRadius: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: "center",
    height: '70vh',
    [theme.breakpoints.only("sm")]: {
        width: "80%"
    },
    [theme.breakpoints.only("xs")]: {
        width: "100%",
        height: '95vh',
        marginTop: 23,
    }

}))



export const StyledForm = styled('form')(({ theme }) => ({
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    padding: 2,
    height: '100%',
    [theme.breakpoints.only('sm')]: {
        padding: 0
    },
    [theme.breakpoints.only('xs')]: {
        flexDirection: 'column'

    }

}))




export const StyledTextFiels = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: "40%",
    height: '100%',
    paddingLeft: 10,
    [theme.breakpoints.up('lg')]: {
        paddingRight: 30,
    },
    [theme.breakpoints.only('md')]: {
        paddingRight: 10,
    },
    [theme.breakpoints.only('sm')]: {
        paddingRight: 1,
    },
    [theme.breakpoints.only('xs')]: {
        width: "100%",
        paddingLeft: 30

    },


}))


export const StyledCreateButton = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'end',
    marginBottom: 20,
    [theme.breakpoints.only('sm')]: {
        marginBottom: 1,
    }

}))

export const StyledDragAndDropContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: 'center',
    [theme.breakpoints.up('lg')]: {
        paddingLeft: 30,
    },
    [theme.breakpoints.only('md')]: {
        paddingLeft: 10,
    },
    [theme.breakpoints.only('sm')]: {
        paddingLeft: 1,
    },



}))

export const StyledDragAndDrop = styled(Box)(({ theme }) => ({
    borderRadius: '20px',
    border: 'dotted',
    borderColor: grey[400],
    display: 'flex',
    justifyContent: "center",
    alignItems: 'center',
    height: '70%',
    backgroundColor: grey[300],
    '&:hover': {
        backgroundColor: alpha(grey[500], 0.50),
    },
    [theme.breakpoints.up('md')]: {
        width: '290px',
    },
    [theme.breakpoints.only('sm')]: {
        width: '290px',
    },
    [theme.breakpoints.only('xs')]: {
        marginTop: 20,
        width: '290px',
        height: '30vh'
    },


}))


export const StyledImage = styled('img')(({ theme }) => ({
    width: '100%',
    objectFit: 'contain',

    [theme.breakpoints.only('xs')]: {
        width: '290px',
        height: '30vh'
    }
}))

export const EmojiPickerContainer = styled(Box)(({ theme }) => ({
    position: 'absolute',
    bottom: 100,
    left: 370,
    zIndex: 50,
    [theme.breakpoints.only('md')]: {
        left: 180,
        bottom: 150
    },
    [theme.breakpoints.only('sm')]: {
        left: 80,
        bottom: 120
    },
    [theme.breakpoints.only('xs')]: {
        left: 20,
        top: 100,
    },
}))
