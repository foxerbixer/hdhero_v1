import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import deepOrange from '@material-ui/core/colors/deepOrange';
import teal from '@material-ui/core/colors/teal';
import CssBaseline from '@material-ui/core/CssBaseline';


const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: teal[300],
      main: teal[500],
      dark: teal[700],
    },
    secondary: {
      light: deepOrange[300],
      main: deepOrange[500],
      dark: deepOrange[700],
    }
  }
})

// const theme = createMuiTheme({
//   palette: {
//     type: 'dark'
//   }
// })

function withRoot(Component) {
  function WithRoot(props) {

    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    )
  }

  return WithRoot
}

export default withRoot