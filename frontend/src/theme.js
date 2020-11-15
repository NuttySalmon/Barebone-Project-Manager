import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#04756F',
    },
    secondary: {
      main: '#1662A8',
    },
    error: {
      main: "#E27E7E",
    },
    background: {
      default: '#F2F2F0',
    },
  },
});

export default theme;