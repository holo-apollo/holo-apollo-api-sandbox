import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import theme from 'common/theme';

import '../../../static/css/base2.css';

// automatically import all components stories
const componentsReq = require.context(
  '../../src/',
  true,
  /stories\/.*\.stories\.js$/
);

// automatically import all custom stories
const customStoriesReq = require.context(
  '../stories',
  true,
  /.*\.stories\.js$/
);

function loadStories() {
  componentsReq.keys().forEach(filename => componentsReq(filename));
  customStoriesReq.keys().forEach(filename => customStoriesReq(filename));
}

const djangoDataDecorator = story => {
  window.django_data = {
    urls: {}
  };
  window.gettext = text => text;
  window.pgettext = (context, text) => text;
  return story();
};

const themeDecorator = story => (
  <div style={{ padding: '20px', minHeight: '100vh' }}>
    <MuiThemeProvider theme={theme}>{story()}</MuiThemeProvider>
  </div>
);

addDecorator(djangoDataDecorator);
addDecorator(themeDecorator);
addDecorator(withKnobs);

configure(loadStories, module);
