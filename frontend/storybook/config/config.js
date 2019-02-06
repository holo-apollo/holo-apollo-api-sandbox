import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createGlobalStyle } from 'styled-components';

import theme from 'common/theme';

// automatically import all components stories
const componentsReq = require.context(
  '../../src/',
  true,
  /stories\/.*\.stories\.js$/
);

function loadStories() {
  componentsReq.keys().forEach(filename => componentsReq(filename));
}

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Montserrat', Arial, sans-serif;
    color: #404040;
    -webkit-text-size-adjust: none;
  }

  button {
    font-family: inherit;
  }
`;

const themeDecorator = story => (
  <div style={{ padding: '20px', minHeight: '100vh' }}>
    <link
      href="https://fonts.googleapis.com/css?family=Montserrat"
      rel="stylesheet"
    />
    <GlobalStyle />
    <MuiThemeProvider theme={theme}>{story()}</MuiThemeProvider>
  </div>
);

addDecorator(themeDecorator);
addDecorator(withKnobs);

configure(loadStories, module);
