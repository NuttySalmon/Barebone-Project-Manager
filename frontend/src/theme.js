import { createMuiTheme } from '@material-ui/core/styles'

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: { main: '#4b85a2' },
    secondary: { main: '#F0D21C' },
    grey: { main: '#E0E0E0' },
    error: { main: '#E27E7E' },
    background: { default: '#f6f6f6' },
  },
})

export default theme
