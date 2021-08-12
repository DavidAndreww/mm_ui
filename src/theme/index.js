import { createTheme } from '@material-ui/core'
import shadows from './shadows'
import typography from './typography'
import colors from './colors'

const theme = createTheme({
  palette: {
    background: {
      paper: colors.main.white,
    },    
    primary: {
      contrastText: colors.main.white,
      main: colors.main.darkBlue,
    },
    secondary: {
      contrastText: colors.main.white,
      main: colors.main.primaryRed,
    },
    text: {
      primary: colors.main.darkGray,
      secondary:colors.main.offBlack,
    },
  },
  overrides: {
    MuiButton: {
      // containedPrimary: {
      //   '&:hover': {
      //     backgroundColor: colors.main.white,
      //     color: colors.main.darkBlue,
      //     borderColor: colors.main.darkBlue,
      //     border: '1px solid',
      //   },
      // },
      // outlinedPrimary: {
      //   backgroundColor: colors.main.white,
      //   '&:hover': {
      //     backgroundColor: colors.main.darkBlue,
      //     color: colors.main.white,
      //   },
      // },      
      // containedSecondary: {
      //   '&:hover': {
      //     backgroundColor: colors.main.white,
      //     color: colors.main.primaryRed,
      //     border: '1px solid',
      //     borderColor: colors.main.primaryRed,
      //   },
      // },
      // outlinedSecondary: {
      //   backgroundColor: colors.main.white,
      //   '&:hover': {
      //     backgroundColor: colors.main.primaryRed,
      //     color: colors.main.white,
      //   },
      // },
    },
  },
  typography,
  shadows,
})

export default theme
