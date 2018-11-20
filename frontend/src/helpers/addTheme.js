import React from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import theme from 'common/theme';

const addTheme = Component => (
  <MuiThemeProvider theme={theme}>
    <Component />
  </MuiThemeProvider>
);

export default addTheme;
