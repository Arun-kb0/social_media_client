import { styled ,Box} from "../../imports/materialuiComponents";

export const HomeContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  right: 0,
  top: 65,
  left: 0,
  [theme.breakpoints.only('xs')]: {
    top: 50,
  }
}))