import { createTheme } from "@mui/material";

export const theme  = createTheme({
    palette:{
        // add custome colors
    },
    components: {
        // Name of the component ⚛️
        Stack: {
          defaultProps: {
            // The props to apply
            disableRipple: true,
            disableScrollLock:true // No more ripple, on the whole application 💣!
          },
        },
      },
    
})