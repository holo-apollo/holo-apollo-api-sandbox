import { createMuiTheme } from '@material-ui/core/styles';

import palette from 'common/palette';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: palette.blue,
      dark: palette.blue,
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: 'Montserrat, Arial, sans-serif',
  },
});

export default theme;
