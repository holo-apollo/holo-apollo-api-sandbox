import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

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

addDecorator(djangoDataDecorator);
addDecorator(withKnobs);

configure(loadStories, module);
